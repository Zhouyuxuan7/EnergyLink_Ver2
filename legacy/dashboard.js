// Dashboard Stock Trading Interface JavaScript

// Global variables
let priceData = [];
let tradesData = [];
let isAutoMatchActive = true;
let isAutoTradeActive = false;
let currentTab = 'buy';
let priceUpdateInterval;
let tradesUpdateInterval;
let currentRole = 'buyer'; // 'buyer' or 'seller'
let currentRange = '24h'; // '24h', '7d', '30d'
let accountOverviewData = {
    buyer: {
        kwhToday: 5.2,
        savingsUsd: 0.84,
        budgetRemainingUsd: 27.5,
        percentOfGoal: 52
    },
    seller: {
        kwhToday: 6.8,
        upliftUsd: 1.12,
        socPercent: 62,
        percentOfGoal: 57
    }
};

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    startRealTimeUpdates();
    loadUserData();
});

function initializeDashboard() {
    // Load user role from localStorage
    loadUserRole();
    
    // Initialize price chart
    initializePriceChart();
    
    // Initialize account overview
    initializeAccountOverview();
    
    // Initialize trades table
    initializeTradesTable();
    
    // Initialize quick trade form
    initializeQuickTrade();
    
    // Set up sidebar navigation
    setupSidebarNavigation();
    
    // Load initial data
    loadInitialData();
}

function setupEventListeners() {
    // Time filter buttons
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            switchTimeFilter(this.dataset.period);
        });
    });
    
    // Range control buttons for Account Overview
    const rangeButtons = document.querySelectorAll('.range-btn');
    rangeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            switchRange(this.dataset.range);
        });
    });
    
    // Trade tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            switchTradeTab(this.dataset.tab);
        });
    });
    
    // Quick trade form inputs
    const quantityInput = document.getElementById('tradeQuantity');
    const priceInput = document.getElementById('tradePrice');
    
    if (quantityInput && priceInput) {
        quantityInput.addEventListener('input', updateTradeCalculations);
        priceInput.addEventListener('input', updateTradeCalculations);
    }
}

function loadUserData() {
    // Load user data from localStorage
    const savedAuth = localStorage.getItem('energyLinkAuth');
    if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        const userInitials = document.getElementById('userInitials');
        const userName = document.getElementById('userName');
        
        if (userInitials && authData.user) {
            userInitials.textContent = authData.user.initials;
        }
        
        if (userName && authData.user) {
            userName.textContent = authData.user.name;
        }
    }
}

function loadUserRole() {
    // Load user role from localStorage, default to 'buyer' if not set
    const savedRole = localStorage.getItem('energyLinkUserRole');
    currentRole = savedRole || 'buyer';
    
    // Update role display
    const userRoleElement = document.getElementById('userRole');
    if (userRoleElement) {
        userRoleElement.textContent = currentRole.charAt(0).toUpperCase() + currentRole.slice(1);
    }
}

function toggleUserRole() {
    // Toggle between buyer and seller
    currentRole = currentRole === 'buyer' ? 'seller' : 'buyer';
    
    // Save to localStorage
    localStorage.setItem('energyLinkUserRole', currentRole);
    
    // Update role display
    const userRoleElement = document.getElementById('userRole');
    if (userRoleElement) {
        userRoleElement.textContent = currentRole.charAt(0).toUpperCase() + currentRole.slice(1);
    }
    
    // Update Account Overview UI
    updateAccountOverviewUI();
    
    // Show notification
    showNotification(`Switched to ${currentRole} mode`, 'info');
}

function initializeAccountOverview() {
    // Initialize donut chart
    initializeDonutChart();
    
    // Update UI based on current role and range
    updateAccountOverviewUI();
}

function initializeDonutChart() {
    const canvas = document.getElementById('accountDonutChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    updateDonutChart();
}

function updateDonutChart() {
    const canvas = document.getElementById('accountDonutChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const innerRadius = 50;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const data = accountOverviewData[currentRole];
    const percentOfGoal = data.percentOfGoal || 0;
    const angle = (percentOfGoal / 100) * 2 * Math.PI;
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();
    
    // Draw progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + angle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = currentRole === 'buyer' ? '#00FF88' : '#FFC107';
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Draw inner circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fill();
    
    // Update center text
    const donutValue = document.getElementById('donutValue');
    const donutLabel = document.getElementById('donutLabel');
    if (donutValue) donutValue.textContent = data.kwhToday.toFixed(1);
    if (donutLabel) donutLabel.textContent = 'kWh';
}

function updateAccountOverviewUI() {
    const data = accountOverviewData[currentRole];
    const isBuyer = currentRole === 'buyer';
    
    // Update KPI labels and values
    const kpi1Label = document.getElementById('kpi1Label');
    const kpi1Value = document.getElementById('kpi1Value');
    const kpi2Label = document.getElementById('kpi2Label');
    const kpi2Value = document.getElementById('kpi2Value');
    const kpi3Label = document.getElementById('kpi3Label');
    const kpi3Value = document.getElementById('kpi3Value');
    
    if (isBuyer) {
        if (kpi1Label) kpi1Label.textContent = 'kWh bought today';
        if (kpi1Value) kpi1Value.textContent = data.kwhToday.toFixed(1);
        if (kpi2Label) kpi2Label.textContent = 'Savings vs retail ($)';
        if (kpi2Value) kpi2Value.textContent = `$${data.savingsUsd.toFixed(2)}`;
        if (kpi3Label) kpi3Label.textContent = 'Budget remaining ($)';
        if (kpi3Value) kpi3Value.textContent = `$${data.budgetRemainingUsd.toFixed(0)}`;
    } else {
        if (kpi1Label) kpi1Label.textContent = 'kWh exported today';
        if (kpi1Value) kpi1Value.textContent = data.kwhToday.toFixed(1);
        if (kpi2Label) kpi2Label.textContent = 'Uplift vs export ($)';
        if (kpi2Value) kpi2Value.textContent = `$${data.upliftUsd.toFixed(2)}`;
        if (kpi3Label) kpi3Label.textContent = 'Battery SoC (%)';
        if (kpi3Value) kpi3Value.textContent = `${data.socPercent}%`;
    }
    
    // Update donut chart
    updateDonutChart();
}

function switchRange(range) {
    currentRange = range;
    
    // Update active button
    document.querySelectorAll('.range-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-range="${range}"]`).classList.add('active');
    
    // Update data based on range (simulate different data)
    updateAccountDataForRange(range);
    
    // Update UI
    updateAccountOverviewUI();
    
    showNotification(`Switched to ${range} view`, 'info');
}

function updateAccountDataForRange(range) {
    // Simulate different data based on range
    const multiplier = range === '24h' ? 1 : range === '7d' ? 7 : 30;
    
    if (currentRole === 'buyer') {
        accountOverviewData.buyer.kwhToday = 5.2 * multiplier;
        accountOverviewData.buyer.savingsUsd = 0.84 * multiplier;
        accountOverviewData.buyer.budgetRemainingUsd = Math.max(0, 100 - (accountOverviewData.buyer.kwhToday * 0.45));
        accountOverviewData.buyer.percentOfGoal = Math.min(100, (accountOverviewData.buyer.kwhToday / 10) * 100);
    } else {
        accountOverviewData.seller.kwhToday = 6.8 * multiplier;
        accountOverviewData.seller.upliftUsd = 1.12 * multiplier;
        accountOverviewData.seller.socPercent = Math.max(20, 100 - (accountOverviewData.seller.kwhToday * 2));
        accountOverviewData.seller.percentOfGoal = Math.min(100, (accountOverviewData.seller.kwhToday / 12) * 100);
    }
}

function initializePriceChart() {
    const canvas = document.getElementById('priceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Generate initial price data
    generatePriceData();
    
    // Draw initial chart
    drawPriceChart(ctx);
}

function generatePriceData() {
    priceData = [];
    const now = new Date();
    const basePrice = 0.45;
    
    for (let i = 0; i < 20; i++) {
        const time = new Date(now.getTime() - (19 - i) * 5 * 60000); // 5-minute intervals
        const variation = (Math.random() - 0.5) * 0.1;
        const price = Math.max(0.20, Math.min(0.80, basePrice + variation));
        
        priceData.push({
            time: time,
            price: price
        });
    }
}

function drawPriceChart(ctx) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    if (priceData.length < 2) return;
    
    // Find min and max prices
    const prices = priceData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 6; i++) {
        const y = (height / 6) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 8; i++) {
        const x = (width / 8) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Draw price line with gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#00FF88');
    gradient.addColorStop(1, '#FFC107');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    priceData.forEach((point, index) => {
        const x = (width / (priceData.length - 1)) * index;
        const y = height - ((point.price - minPrice) / priceRange) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw area under curve with gradient
    const areaGradient = ctx.createLinearGradient(0, 0, 0, height);
    areaGradient.addColorStop(0, 'rgba(0, 255, 136, 0.2)');
    areaGradient.addColorStop(1, 'rgba(0, 255, 136, 0.05)');
    
    ctx.fillStyle = areaGradient;
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    priceData.forEach((point, index) => {
        const x = (width / (priceData.length - 1)) * index;
        const y = height - ((point.price - minPrice) / priceRange) * height;
        ctx.lineTo(x, y);
    });
    
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
    
    // Draw current price point
    const currentPrice = priceData[priceData.length - 1].price;
    const currentX = width - 1;
    const currentY = height - ((currentPrice - minPrice) / priceRange) * height;
    
    // Outer glow
    ctx.shadowColor = '#00FF88';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#00FF88';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Inner dot
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Update current price display
    updateCurrentPriceDisplay(currentPrice);
}

function updateCurrentPriceDisplay(price) {
    const currentPriceElement = document.getElementById('currentPrice');
    const priceChangeElement = document.getElementById('priceChange');
    
    if (currentPriceElement) {
        currentPriceElement.textContent = `$${price.toFixed(2)}`;
    }
    
    if (priceChangeElement && priceData.length > 1) {
        const previousPrice = priceData[priceData.length - 2].price;
        const change = ((price - previousPrice) / previousPrice) * 100;
        const changeText = change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
        
        priceChangeElement.textContent = changeText;
        priceChangeElement.className = `price-change ${change >= 0 ? 'positive' : 'negative'}`;
    }
}

function setPrice(price) {
    const priceInput = document.getElementById('tradePrice');
    if (priceInput) {
        priceInput.value = price.toFixed(2);
        updateTradeCalculations();
    }
}

function initializeTradesTable() {
    const tbody = document.getElementById('tradesTableBody');
    if (!tbody) return;
    
    // Generate initial trades data
    generateTradesData();
    
    // Populate table
    updateTradesTable();
}

function generateTradesData() {
    tradesData = [];
    const neighbors = ['Sarah M.', 'James R.', 'Lisa P.', 'David C.', 'Alex J.', 'Maria G.'];
    const now = new Date();
    
    for (let i = 0; i < 10; i++) {
        const time = new Date(now.getTime() - i * 15 * 60000); // 15-minute intervals
        const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        const type = Math.random() > 0.5 ? 'buy' : 'sell';
        const quantity = (Math.random() * 20 + 5).toFixed(1);
        const price = (Math.random() * 0.3 + 0.3).toFixed(2);
        const status = Math.random() > 0.2 ? 'completed' : 'pending';
        
        tradesData.push({
            time: time,
            neighbor: neighbor,
            type: type,
            quantity: quantity,
            price: price,
            status: status
        });
    }
}

function updateTradesTable() {
    const tbody = document.getElementById('tradesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = tradesData.map(trade => `
        <tr>
            <td>${trade.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
            <td>${trade.neighbor}</td>
            <td><span class="trade-type ${trade.type}">${trade.type.toUpperCase()}</span></td>
            <td>${trade.quantity}</td>
            <td>$${trade.price}</td>
            <td><span class="status-badge ${trade.status}">${trade.status}</span></td>
        </tr>
    `).join('');
}

function initializeQuickTrade() {
    // Set initial tab
    switchTradeTab('buy');
    
    // Update calculations
    updateTradeCalculations();
}

function switchTradeTab(tab) {
    currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    // Update form based on tab
    updateTradeCalculations();
}

function updateTradeCalculations() {
    const quantity = parseFloat(document.getElementById('tradeQuantity').value) || 0;
    const price = parseFloat(document.getElementById('tradePrice').value) || 0;
    
    const retailPrice = 0.55; // Average retail price
    const exportPrice = 0.30; // Average export price
    
    let savings = 0;
    let totalCost = quantity * price;
    
    if (currentTab === 'buy') {
        savings = (retailPrice - price) * quantity;
    } else {
        savings = (price - exportPrice) * quantity;
    }
    
    document.getElementById('expectedSavings').textContent = `$${savings.toFixed(2)}`;
    document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;
}

function placeOrder() {
    const quantity = parseFloat(document.getElementById('tradeQuantity').value);
    const price = parseFloat(document.getElementById('tradePrice').value);
    
    if (!quantity || !price) {
        showNotification('Please enter valid quantity and price', 'error');
        return;
    }
    
    // Create new trade
    const newTrade = {
        time: new Date(),
        neighbor: 'You',
        type: currentTab,
        quantity: quantity.toFixed(1),
        price: price.toFixed(2),
        status: 'pending'
    };
    
    // Add to trades data
    tradesData.unshift(newTrade);
    
    // Keep only last 20 trades
    if (tradesData.length > 20) {
        tradesData = tradesData.slice(0, 20);
    }
    
    // Update table
    updateTradesTable();
    
    // Show confirmation
    showNotification(`${currentTab.toUpperCase()} order placed for ${quantity} kWh at $${price}/kWh`, 'success');
    
    // Clear form
    document.getElementById('tradeQuantity').value = '10';
    document.getElementById('tradePrice').value = '0.45';
    updateTradeCalculations();
}

function setupSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle section switching
            const section = this.dataset.section;
            handleSectionSwitch(section);
        });
    });
}

function handleSectionSwitch(section) {
    // For now, just show a notification
    // In a real app, this would switch between different dashboard views
    showNotification(`Switched to ${section} view`, 'info');
}

function toggleAutoMatch(active) {
    isAutoMatchActive = active;
    
    const statusElement = document.getElementById('tradingStatus');
    const statusIndicator = statusElement.querySelector('.status-indicator');
    const statusText = statusElement.querySelector('span');
    
    if (active) {
        statusIndicator.classList.remove('inactive');
        statusIndicator.classList.add('active');
        statusText.textContent = 'Auto-Match Active';
        showNotification('Auto-Match trading enabled', 'success');
    } else {
        statusIndicator.classList.remove('active');
        statusIndicator.classList.add('inactive');
        statusText.textContent = 'Auto-Match Inactive';
        showNotification('Auto-Match trading disabled', 'info');
    }
}

function showPreferencesModal() {
    const modal = document.getElementById('preferencesModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.animation = 'fadeIn 0.3s ease-out';
    }
}

function hidePreferencesModal() {
    const modal = document.getElementById('preferencesModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function handlePreferencesSubmit(e) {
    e.preventDefault();
    
    const maxBuyPrice = document.getElementById('maxBuyPriceInput').value;
    const minSellPrice = document.getElementById('minSellPriceInput').value;
    const dailyLimit = document.getElementById('dailyLimitInput').value;
    
    // Update display values
    document.getElementById('maxBuyPrice').textContent = `$${maxBuyPrice}/kWh`;
    document.getElementById('minSellPrice').textContent = `$${minSellPrice}/kWh`;
    document.getElementById('dailyLimit').textContent = `${dailyLimit} kWh`;
    
    // Hide modal
    hidePreferencesModal();
    
    // Show confirmation
    showNotification('Trading preferences updated', 'success');
}

function startRealTimeUpdates() {
    // Update price chart every 5 seconds
    priceUpdateInterval = setInterval(() => {
        updatePriceChart();
    }, 5000);
    
    // Update trades every 3-6 seconds
    tradesUpdateInterval = setInterval(() => {
        updateTradesData();
    }, Math.random() * 3000 + 3000);
}

function updatePriceChart() {
    // Add new price point
    const now = new Date();
    const lastPrice = priceData[priceData.length - 1].price;
    const variation = (Math.random() - 0.5) * 0.05;
    const newPrice = Math.max(0.20, Math.min(0.80, lastPrice + variation));
    
    priceData.push({
        time: now,
        price: newPrice
    });
    
    // Keep only last 20 points
    if (priceData.length > 20) {
        priceData = priceData.slice(1);
    }
    
    // Redraw chart
    const canvas = document.getElementById('priceChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        drawPriceChart(ctx);
    }
    
    // Update KPI values
    updateKPIValues();
}

function updateTradesData() {
    // Randomly add new trade
    if (Math.random() > 0.7) {
        const neighbors = ['Sarah M.', 'James R.', 'Lisa P.', 'David C.', 'Alex J.', 'Maria G.'];
        const now = new Date();
        const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        const type = Math.random() > 0.5 ? 'buy' : 'sell';
        const quantity = (Math.random() * 20 + 5).toFixed(1);
        const price = (Math.random() * 0.3 + 0.3).toFixed(2);
        const status = 'completed';
        
        const newTrade = {
            time: now,
            neighbor: neighbor,
            type: type,
            quantity: quantity,
            price: price,
            status: status
        };
        
        tradesData.unshift(newTrade);
        
        // Keep only last 20 trades
        if (tradesData.length > 20) {
            tradesData = tradesData.slice(0, 20);
        }
        
        // Update table
        updateTradesTable();
    }
}

function updateKPIValues() {
    // Update kWh shared
    const kwhElement = document.getElementById('kwhShared');
    if (kwhElement) {
        const currentValue = parseInt(kwhElement.textContent);
        const newValue = currentValue + Math.floor(Math.random() * 3);
        kwhElement.textContent = newValue;
    }
    
    // Update average price
    const avgPriceElement = document.getElementById('avgPrice');
    if (avgPriceElement) {
        const currentPrice = priceData[priceData.length - 1].price;
        avgPriceElement.textContent = `$${currentPrice.toFixed(2)}`;
    }
    
    // Update CO₂ saved
    const co2Element = document.getElementById('co2Saved');
    if (co2Element) {
        const currentValue = parseFloat(co2Element.textContent);
        const newValue = currentValue + (Math.random() * 0.5);
        co2Element.textContent = newValue.toFixed(1);
    }
}

function loadInitialData() {
    // Load any saved preferences
    const savedPreferences = localStorage.getItem('energyLinkPreferences');
    if (savedPreferences) {
        const prefs = JSON.parse(savedPreferences);
        document.getElementById('maxBuyPriceInput').value = prefs.maxBuyPrice || 0.50;
        document.getElementById('minSellPriceInput').value = prefs.minSellPrice || 0.40;
        document.getElementById('dailyLimitInput').value = prefs.dailyLimit || 50;
        
        // Update display
        document.getElementById('maxBuyPriceValue').textContent = prefs.maxBuyPrice || 0.50;
        document.getElementById('minSellPriceValue').textContent = prefs.minSellPrice || 0.40;
    }
}

function switchTimeFilter(period) {
    // Update active button
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-period="${period}"]`).classList.add('active');
    
    // Regenerate data based on period
    generatePriceDataForPeriod(period);
    
    // Redraw chart
    const canvas = document.getElementById('priceChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        drawPriceChart(ctx);
    }
    
    showNotification(`Switched to ${period} view`, 'info');
}

function generatePriceDataForPeriod(period) {
    priceData = [];
    const now = new Date();
    const basePrice = 0.45;
    let intervalMinutes, dataPoints;
    
    switch(period) {
        case '1h':
            intervalMinutes = 2;
            dataPoints = 30;
            break;
        case '4h':
            intervalMinutes = 8;
            dataPoints = 30;
            break;
        case '1d':
            intervalMinutes = 30;
            dataPoints = 48;
            break;
        case '1w':
            intervalMinutes = 240;
            dataPoints = 42;
            break;
        default:
            intervalMinutes = 5;
            dataPoints = 20;
    }
    
    for (let i = 0; i < dataPoints; i++) {
        const time = new Date(now.getTime() - (dataPoints - 1 - i) * intervalMinutes * 60000);
        const variation = (Math.random() - 0.5) * 0.1;
        const price = Math.max(0.20, Math.min(0.80, basePrice + variation));
        
        priceData.push({
            time: time,
            price: price
        });
    }
}

function refreshChart() {
    // Regenerate price data
    generatePriceData();
    
    // Redraw chart
    const canvas = document.getElementById('priceChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        drawPriceChart(ctx);
    }
    
    showNotification('Chart data refreshed', 'info');
}

function refreshTrades() {
    // Regenerate trades data
    generateTradesData();
    
    // Update table
    updateTradesTable();
    
    showNotification('Trades data refreshed', 'info');
}

// Auto-Trade functionality
function toggleAutoTrade() {
    isAutoTradeActive = !isAutoTradeActive;
    
    const autoTradeBtn = document.getElementById('autoTradeBtn');
    const autoTradeStatus = document.getElementById('autoTradeStatus');
    
    if (isAutoTradeActive) {
        autoTradeBtn.classList.add('active');
        autoTradeStatus.textContent = 'Active';
        showNotification('Auto-Trade activated - AI will now manage your trades', 'success');
        
        // Start auto-trading simulation
        startAutoTrading();
    } else {
        autoTradeBtn.classList.remove('active');
        autoTradeStatus.textContent = 'Inactive';
        showNotification('Auto-Trade deactivated', 'info');
        
        // Stop auto-trading simulation
        stopAutoTrading();
    }
}

function startAutoTrading() {
    // Simulate AI making trades every 10-30 seconds
    if (window.autoTradeInterval) {
        clearInterval(window.autoTradeInterval);
    }
    
    window.autoTradeInterval = setInterval(() => {
        if (isAutoTradeActive) {
            simulateAutoTrade();
        }
    }, Math.random() * 20000 + 10000); // 10-30 seconds
}

function stopAutoTrading() {
    if (window.autoTradeInterval) {
        clearInterval(window.autoTradeInterval);
        window.autoTradeInterval = null;
    }
}

function simulateAutoTrade() {
    // Simulate AI making a trade decision
    const shouldTrade = Math.random() > 0.7; // 30% chance of trading
    
    if (shouldTrade) {
        const currentPrice = priceData[priceData.length - 1].price;
        const tradeType = Math.random() > 0.5 ? 'buy' : 'sell';
        const quantity = (Math.random() * 15 + 5).toFixed(1);
        const price = (currentPrice + (Math.random() - 0.5) * 0.05).toFixed(2);
        
        // Create auto-trade
        const newTrade = {
            time: new Date(),
            neighbor: 'AI Trader',
            type: tradeType,
            quantity: quantity,
            price: price,
            status: 'completed'
        };
        
        // Add to trades data
        tradesData.unshift(newTrade);
        
        // Keep only last 20 trades
        if (tradesData.length > 20) {
            tradesData = tradesData.slice(0, 20);
        }
        
        // Update table
        updateTradesTable();
        
        // Show notification
        showNotification(`AI executed ${tradeType.toUpperCase()} order: ${quantity} kWh at $${price}/kWh`, 'info');
    }
}

// Settings gear functionality
function openTradingPreferences() {
    // Navigate to trading preferences page
    window.location.href = 'trading-preferences.html';
}

// Utility function for notifications (reuse from main script)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#00FF88',
        error: '#FF6B6B',
        info: '#219653'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Clean up intervals when page unloads
window.addEventListener('beforeunload', function() {
    if (priceUpdateInterval) clearInterval(priceUpdateInterval);
    if (tradesUpdateInterval) clearInterval(tradesUpdateInterval);
    if (window.autoTradeInterval) clearInterval(window.autoTradeInterval);
});

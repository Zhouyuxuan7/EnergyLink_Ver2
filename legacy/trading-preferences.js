// Trading Preferences JavaScript

// Global variables
let initialPreferences = {
    orderEntry: {
        defaultAction: 'buy',
        defaultQuantity: 10,
        orderType: 'limit',
        timeInForce: 'day',
        orderConfirmations: true,
        hotkeys: {
            quickBuy: 'Ctrl+B',
            quickSell: 'Ctrl+S',
            autoTradeToggle: 'Ctrl+T'
        },
        automatedBrackets: true,
        stopLoss: 5,
        profitTarget: 10
    },
    notifications: {
        priceAlerts: true,
        priceLevel: 0.50,
        volumeSpikes: true,
        volumeThreshold: 150,
        technicalIndicators: {
            movingAverage: true,
            rsi: false,
            macd: true
        },
        newsUpdates: true,
        earnings: false,
        notificationMethods: {
            inApp: true,
            email: false,
            sms: false
        }
    },
    platform: {
        riskManagement: {
            maxOrderSize: 100,
            dailyLimit: 500,
            maxPositionSize: 25
        },
        buyingPowerWarnings: true,
        warningThreshold: 80,
        dataFeed: 'realtime',
        displayOptions: {
            priceChangeIndicators: true,
            volumeBars: true,
            technicalIndicators: false,
            orderBook: true
        },
        watchlistColumns: {
            price: true,
            change: true,
            volume: true,
            marketCap: false,
            peRatio: false
        }
    }
};

let preferences = {
    orderEntry: {
        defaultAction: 'buy',
        defaultQuantity: 10,
        orderType: 'limit',
        timeInForce: 'day',
        orderConfirmations: true,
        hotkeys: {
            quickBuy: 'Ctrl+B',
            quickSell: 'Ctrl+S',
            autoTradeToggle: 'Ctrl+T'
        },
        automatedBrackets: true,
        stopLoss: 5,
        profitTarget: 10
    },
    notifications: {
        priceAlerts: true,
        priceLevel: 0.50,
        volumeSpikes: true,
        volumeThreshold: 150,
        technicalIndicators: {
            movingAverage: true,
            rsi: false,
            macd: true
        },
        newsUpdates: true,
        earnings: false,
        notificationMethods: {
            inApp: true,
            email: false,
            sms: false
        }
    },
    platform: {
        riskManagement: {
            maxOrderSize: 100,
            dailyLimit: 500,
            maxPositionSize: 25
        },
        buyingPowerWarnings: true,
        warningThreshold: 80,
        dataFeed: 'realtime',
        displayOptions: {
            priceChangeIndicators: true,
            volumeBars: true,
            technicalIndicators: false,
            orderBook: true
        },
        watchlistColumns: {
            price: true,
            change: true,
            volume: true,
            marketCap: false,
            peRatio: false
        }
    }
};

// Navigation functions
function navigateToDashboard() {
    console.log('Navigating to dashboard...');
    
    // Add smooth transition effect
    document.body.style.transition = 'opacity 0.3s ease-out';
    document.body.style.opacity = '0.7';
    
    // Navigate to dashboard
    setTimeout(() => {
        console.log('Redirecting to dashboard.html');
        window.location.href = 'dashboard.html';
    }, 300);
}

function goBackToDashboard() {
    // Check for unsaved changes
    if (hasUnsavedChanges()) {
        if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
            navigateToDashboard();
        }
    } else {
        navigateToDashboard();
    }
}

// Initialize preferences page
document.addEventListener('DOMContentLoaded', function() {
    loadPreferences();
    setupEventListeners();
    setupHotkeyListeners();
});

function loadPreferences() {
    // Load saved preferences from localStorage
    const savedPreferences = localStorage.getItem('energyLinkTradingPreferences');
    if (savedPreferences) {
        preferences = { ...preferences, ...JSON.parse(savedPreferences) };
    }
    
    // Apply preferences to form elements
    applyPreferencesToForm();
}

function applyPreferencesToForm() {
    try {
        // Order Entry
        const defaultActionRadio = document.querySelector(`input[name="defaultAction"][value="${preferences.orderEntry.defaultAction}"]`);
        if (defaultActionRadio) defaultActionRadio.checked = true;
        
        const quantityInput = document.querySelector('input[type="number"]');
        if (quantityInput) quantityInput.value = preferences.orderEntry.defaultQuantity;
        
        const orderTypeSelect = document.querySelector('select');
        if (orderTypeSelect) orderTypeSelect.value = preferences.orderEntry.orderType;
        
        const timeInForceSelect = document.querySelectorAll('select')[1];
        if (timeInForceSelect) timeInForceSelect.value = preferences.orderEntry.timeInForce;
        
        // Notifications
        const notificationCheckboxes = document.querySelectorAll('input[type="checkbox"]');
        if (notificationCheckboxes[0]) notificationCheckboxes[0].checked = preferences.notifications.priceAlerts;
        if (notificationCheckboxes[1]) notificationCheckboxes[1].checked = preferences.notifications.volumeSpikes;
        if (notificationCheckboxes[2]) notificationCheckboxes[2].checked = preferences.notifications.technicalIndicators.movingAverage;
        if (notificationCheckboxes[3]) notificationCheckboxes[3].checked = preferences.notifications.technicalIndicators.rsi;
        if (notificationCheckboxes[4]) notificationCheckboxes[4].checked = preferences.notifications.technicalIndicators.macd;
        if (notificationCheckboxes[5]) notificationCheckboxes[5].checked = preferences.notifications.newsUpdates;
        if (notificationCheckboxes[6]) notificationCheckboxes[6].checked = preferences.notifications.earnings;
        if (notificationCheckboxes[7]) notificationCheckboxes[7].checked = preferences.notifications.notificationMethods.inApp;
        if (notificationCheckboxes[8]) notificationCheckboxes[8].checked = preferences.notifications.notificationMethods.email;
        if (notificationCheckboxes[9]) notificationCheckboxes[9].checked = preferences.notifications.notificationMethods.sms;
        
        // Platform Behavior
        if (notificationCheckboxes[10]) notificationCheckboxes[10].checked = preferences.platform.buyingPowerWarnings;
        if (notificationCheckboxes[11]) notificationCheckboxes[11].checked = preferences.platform.displayOptions.priceChangeIndicators;
        if (notificationCheckboxes[12]) notificationCheckboxes[12].checked = preferences.platform.displayOptions.volumeBars;
        if (notificationCheckboxes[13]) notificationCheckboxes[13].checked = preferences.platform.displayOptions.technicalIndicators;
        if (notificationCheckboxes[14]) notificationCheckboxes[14].checked = preferences.platform.displayOptions.orderBook;
        if (notificationCheckboxes[15]) notificationCheckboxes[15].checked = preferences.platform.watchlistColumns.price;
        if (notificationCheckboxes[16]) notificationCheckboxes[16].checked = preferences.platform.watchlistColumns.change;
        if (notificationCheckboxes[17]) notificationCheckboxes[17].checked = preferences.platform.watchlistColumns.volume;
        if (notificationCheckboxes[18]) notificationCheckboxes[18].checked = preferences.platform.watchlistColumns.marketCap;
        if (notificationCheckboxes[19]) notificationCheckboxes[19].checked = preferences.platform.watchlistColumns.peRatio;
        
        // Data Feed
        const dataFeedRadio = document.querySelector(`input[name="dataFeed"][value="${preferences.platform.dataFeed}"]`);
        if (dataFeedRadio) dataFeedRadio.checked = true;
        
        // Hotkeys
        const hotkeyInputs = document.querySelectorAll('.hotkey-input');
        if (hotkeyInputs[0]) hotkeyInputs[0].value = preferences.orderEntry.hotkeys.quickBuy;
        if (hotkeyInputs[1]) hotkeyInputs[1].value = preferences.orderEntry.hotkeys.quickSell;
        if (hotkeyInputs[2]) hotkeyInputs[2].value = preferences.orderEntry.hotkeys.autoTradeToggle;
        
    } catch (error) {
        console.error('Error applying preferences to form:', error);
    }
}

function setupEventListeners() {
    // Save button
    const saveBtn = document.querySelector('.btn-save');
    if (saveBtn) {
        saveBtn.addEventListener('click', savePreferences);
    }
    
    // Reset button
    const resetBtn = document.querySelector('.btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetPreferences);
    }
    
    // Form inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', updatePreferences);
    });
    
    // Hotkey inputs
    const hotkeyInputs = document.querySelectorAll('.hotkey-input');
    hotkeyInputs.forEach(input => {
        input.addEventListener('click', startHotkeyCapture);
    });
}

function setupHotkeyListeners() {
    // Global hotkey listeners
    document.addEventListener('keydown', function(e) {
        // Check if we're capturing a hotkey
        if (window.capturingHotkey) {
            e.preventDefault();
            captureHotkey(e);
            return;
        }
        
        // Apply existing hotkeys
        if (e.ctrlKey) {
            switch(e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    showNotification('Quick Buy hotkey triggered', 'info');
                    break;
                case 's':
                    e.preventDefault();
                    showNotification('Quick Sell hotkey triggered', 'info');
                    break;
                case 't':
                    e.preventDefault();
                    showNotification('Auto-Trade Toggle hotkey triggered', 'info');
                    break;
            }
        }
    });
}

function updatePreferences() {
    // Update preferences object based on form values
    const formData = new FormData();
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            formData.append(input.name || input.id, input.checked);
        } else if (input.type === 'radio') {
            if (input.checked) {
                formData.append(input.name, input.value);
            }
        } else {
            formData.append(input.name || input.id, input.value);
        }
    });
    
    // Update preferences object
    preferences.orderEntry.defaultAction = formData.get('defaultAction') || 'buy';
    preferences.orderEntry.defaultQuantity = parseFloat(formData.get('defaultQuantity')) || 10;
    preferences.orderEntry.orderType = formData.get('orderType') || 'limit';
    preferences.orderEntry.timeInForce = formData.get('timeInForce') || 'day';
    preferences.platform.dataFeed = formData.get('dataFeed') || 'realtime';
    
    // Show unsaved changes indicator
    showUnsavedChangesIndicator();
}

function savePreferences() {
    // Save to localStorage
    localStorage.setItem('energyLinkTradingPreferences', JSON.stringify(preferences));
    
    // Show success notification
    showNotification('Trading preferences saved successfully!', 'success');
    
    // Hide unsaved changes indicator
    hideUnsavedChangesIndicator();
    
    // Add visual feedback to both save buttons
    const saveBtns = document.querySelectorAll('.btn-save, .btn-save-changes');
    saveBtns.forEach(btn => {
        const originalBg = btn.style.background;
        btn.style.background = 'linear-gradient(135deg, #00CC6A, #00FF88)';
        btn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            btn.style.background = originalBg;
            btn.style.transform = 'scale(1)';
        }, 1000);
    });
}

function resetPreferences() {
    // Reset to initial preferences (deep copy)
    preferences = JSON.parse(JSON.stringify(initialPreferences));
    
    // Apply to form
    applyPreferencesToForm();
    
    // Show notification
    showNotification('Preferences reset to defaults', 'info');
    
    // Hide unsaved changes indicator
    hideUnsavedChangesIndicator();
    
    // Add visual feedback to reset buttons
    const resetBtns = document.querySelectorAll('.btn-reset, .btn-set-default');
    resetBtns.forEach(btn => {
        const originalBg = btn.style.background;
        btn.style.background = 'rgba(255, 193, 7, 0.3)';
        btn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            btn.style.background = originalBg;
            btn.style.transform = 'scale(1)';
        }, 1000);
    });
}

function startHotkeyCapture(e) {
    e.preventDefault();
    window.capturingHotkey = true;
    window.capturingElement = e.target;
    
    e.target.style.background = 'rgba(0, 255, 136, 0.2)';
    e.target.style.borderColor = '#00FF88';
    e.target.value = 'Press key combination...';
    
    showNotification('Press the key combination you want to use', 'info');
}

function captureHotkey(e) {
    e.preventDefault();
    
    let hotkey = '';
    if (e.ctrlKey) hotkey += 'Ctrl+';
    if (e.altKey) hotkey += 'Alt+';
    if (e.shiftKey) hotkey += 'Shift+';
    
    // Add the main key
    if (e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift') {
        return; // Don't capture modifier keys alone
    }
    
    hotkey += e.key.toUpperCase();
    
    // Update the input
    window.capturingElement.value = hotkey;
    window.capturingElement.style.background = 'transparent';
    window.capturingElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    
    // Update preferences
    const hotkeyType = window.capturingElement.previousElementSibling.textContent.toLowerCase().replace(':', '').replace(' ', '');
    if (hotkeyType.includes('buy')) {
        preferences.orderEntry.hotkeys.quickBuy = hotkey;
    } else if (hotkeyType.includes('sell')) {
        preferences.orderEntry.hotkeys.quickSell = hotkey;
    } else if (hotkeyType.includes('toggle')) {
        preferences.orderEntry.hotkeys.autoTradeToggle = hotkey;
    }
    
    window.capturingHotkey = false;
    window.capturingElement = null;
    
    showNotification(`Hotkey set: ${hotkey}`, 'success');
}

function hasUnsavedChanges() {
    // Simple check - in a real app, you'd compare current form state with saved preferences
    return document.querySelector('.unsaved-indicator') !== null;
}

function showUnsavedChangesIndicator() {
    if (!document.querySelector('.unsaved-indicator')) {
        const indicator = document.createElement('div');
        indicator.className = 'unsaved-indicator';
        indicator.textContent = 'Unsaved changes';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #FFC107;
            color: #000;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        document.body.appendChild(indicator);
    }
}

function hideUnsavedChangesIndicator() {
    const indicator = document.querySelector('.unsaved-indicator');
    if (indicator) {
        indicator.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            indicator.remove();
        }, 300);
    }
}

// Utility function for notifications (matching dashboard style)
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
        font-family: var(--font-body);
        font-weight: 500;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle page unload
window.addEventListener('beforeunload', function(e) {
    if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    }
});

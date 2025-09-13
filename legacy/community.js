// Community page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize community page
    initializeCommunity();
    
    // Set up interactive elements
    setupInteractiveElements();
    
    // Set up real-time updates
    setupRealTimeUpdates();
    
    // Initialize animations
    initializeAnimations();
});

function initializeCommunity() {
    // Animate stats cards on load
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 150);
    });
    
    // Animate leaderboard items
    const leaderboardItems = document.querySelectorAll('.leaderboard-item');
    leaderboardItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.4s ease-out';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, 500 + (index * 100));
    });
}

function setupInteractiveElements() {
    // Time filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update leaderboard based on selected period
            updateLeaderboard(this.dataset.period);
        });
    });
    
    // Map view buttons
    const mapButtons = document.querySelectorAll('.map-btn');
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            mapButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update map view
            updateMapView(this.dataset.view);
        });
    });
    
    // Map cell interactions
    const mapCells = document.querySelectorAll('.map-cell');
    mapCells.forEach(cell => {
        cell.addEventListener('click', function() {
            showHouseDetails(this);
        });
        
        cell.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        cell.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Refresh button
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            refreshActivityFeed();
        });
    }
    
    // Achievement card interactions
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('click', function() {
            showAchievementDetails(this);
        });
    });
}

function updateLeaderboard(period) {
    // Simulate data update based on period
    const leaderboardData = {
        month: [
            { name: 'Sarah Miller', location: 'Oak Street', kWh: 247, rank: 1 },
            { name: 'James Rodriguez', location: 'Sunset District', kWh: 198, rank: 2 },
            { name: 'Lisa Park', location: 'Mission District', kWh: 156, rank: 3 },
            { name: 'David Chen', location: 'Castro District', kWh: 134, rank: 4 },
            { name: 'You', location: 'Mission District', kWh: 127, rank: 5 }
        ],
        week: [
            { name: 'Lisa Park', location: 'Mission District', kWh: 89, rank: 1 },
            { name: 'Sarah Miller', location: 'Oak Street', kWh: 76, rank: 2 },
            { name: 'James Rodriguez', location: 'Sunset District', kWh: 65, rank: 3 },
            { name: 'You', location: 'Mission District', kWh: 58, rank: 4 },
            { name: 'David Chen', location: 'Castro District', kWh: 42, rank: 5 }
        ],
        all: [
            { name: 'Sarah Miller', location: 'Oak Street', kWh: 1247, rank: 1 },
            { name: 'James Rodriguez', location: 'Sunset District', kWh: 1098, rank: 2 },
            { name: 'Lisa Park', location: 'Mission District', kWh: 956, rank: 3 },
            { name: 'David Chen', location: 'Castro District', kWh: 834, rank: 4 },
            { name: 'You', location: 'Mission District', kWh: 727, rank: 5 }
        ]
    };
    
    const data = leaderboardData[period] || leaderboardData.month;
    const leaderboard = document.querySelector('.leaderboard');
    
    // Animate out current items
    const currentItems = leaderboard.querySelectorAll('.leaderboard-item');
    currentItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
        }, index * 50);
    });
    
    // Update with new data after animation
    setTimeout(() => {
        leaderboard.innerHTML = data.map((neighbor, index) => `
            <div class="leaderboard-item ${neighbor.name === 'You' ? 'current-user' : ''} rank-${neighbor.rank}">
                <div class="rank">${neighbor.rank}</div>
                <div class="neighbor-info">
                    <div class="neighbor-avatar">${getInitials(neighbor.name)}</div>
                    <div class="neighbor-details">
                        <div class="neighbor-name">${neighbor.name}</div>
                        <div class="neighbor-location">${neighbor.location}</div>
                    </div>
                </div>
                <div class="neighbor-stats">
                    <div class="stat-value">${neighbor.kWh} kWh</div>
                    <div class="stat-label">Traded</div>
                </div>
                ${neighbor.rank <= 3 ? `<div class="trophy">${getTrophy(neighbor.rank)}</div>` : ''}
            </div>
        `).join('');
        
        // Animate in new items
        const newItems = leaderboard.querySelectorAll('.leaderboard-item');
        newItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.4s ease-out';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
        
        // Re-attach event listeners
        setupLeaderboardInteractions();
    }, 300);
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
}

function getTrophy(rank) {
    const trophies = { 1: '🏆', 2: '🥈', 3: '🥉' };
    return trophies[rank] || '';
}

function updateMapView(view) {
    const mapCells = document.querySelectorAll('.map-cell');
    
    if (view === 'heatmap') {
        // Show heat map view
        mapCells.forEach(cell => {
            const stats = cell.querySelector('.house-stats');
            const kWh = parseInt(stats.textContent);
            
            cell.classList.remove('active');
            cell.style.background = '#f8f9fa';
            cell.style.borderColor = '#e9ecef';
            
            if (kWh >= 15) {
                cell.style.background = 'linear-gradient(135deg, var(--primary-green), var(--secondary-yellow))';
                cell.style.borderColor = 'var(--primary-green)';
                cell.classList.add('active');
            } else if (kWh >= 8) {
                cell.style.background = 'var(--secondary-yellow)';
                cell.style.borderColor = 'var(--secondary-yellow)';
            } else {
                cell.style.background = '#e9ecef';
                cell.style.borderColor = '#e9ecef';
            }
        });
    } else if (view === 'trades') {
        // Show recent trades view
        mapCells.forEach(cell => {
            cell.classList.remove('active');
            cell.style.background = '#f8f9fa';
            cell.style.borderColor = '#e9ecef';
            
            // Randomly show some cells as active for recent trades
            if (Math.random() > 0.6) {
                cell.classList.add('active');
                cell.style.background = 'linear-gradient(135deg, var(--primary-green), var(--secondary-yellow))';
                cell.style.borderColor = 'var(--primary-green)';
            }
        });
    }
}

function showHouseDetails(cell) {
    const houseId = cell.dataset.house;
    const stats = cell.querySelector('.house-stats').textContent;
    
    // Create house details modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>House ${houseId} Details</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="house-details">
                    <div class="detail-row">
                        <span class="detail-label">Energy Traded Today:</span>
                        <span class="detail-value">${stats}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span class="detail-value">${cell.classList.contains('active') ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Last Trade:</span>
                        <span class="detail-value">2 hours ago</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Total Savings:</span>
                        <span class="detail-value">$${(Math.random() * 50 + 10).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .modal-content {
                background: white;
                border-radius: 16px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease-out;
            }
            
            .modal-header {
                padding: 30px 30px 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                font-family: var(--font-heading);
                font-size: 24px;
                font-weight: 700;
                color: var(--deep-forest);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            }
            
            .modal-body {
                padding: 30px;
            }
            
            .house-details {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .detail-label {
                font-weight: 600;
                color: var(--deep-forest);
            }
            
            .detail-value {
                color: #666;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = modalStyles;
        document.head.appendChild(style);
    }
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function refreshActivityFeed() {
    const refreshBtn = document.querySelector('.refresh-btn');
    const activityFeed = document.querySelector('.activity-feed');
    
    // Animate refresh button
    refreshBtn.style.transform = 'rotate(360deg)';
    refreshBtn.style.transition = 'transform 0.5s ease-out';
    
    // Add new activity items
    const newActivities = [
        {
            icon: '⚡',
            text: '<strong>Alex Johnson</strong> sold 5.2 kWh to <strong>Maria Garcia</strong>',
            time: 'Just now'
        },
        {
            icon: '🌱',
            text: 'Community reached 1000 kWh milestone this week!',
            time: '5 minutes ago'
        },
        {
            icon: '👋',
            text: '<strong>Tom Wilson</strong> joined EnergyLink',
            time: '10 minutes ago'
        }
    ];
    
    // Fade out current items
    const currentItems = activityFeed.querySelectorAll('.activity-item');
    currentItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
        }, index * 50);
    });
    
    // Add new items after fade out
    setTimeout(() => {
        // Remove old items
        currentItems.forEach(item => item.remove());
        
        // Add new items
        newActivities.forEach((activity, index) => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `;
            
            activityItem.style.opacity = '0';
            activityItem.style.transform = 'translateX(-20px)';
            activityItem.style.transition = 'all 0.4s ease-out';
            
            activityFeed.appendChild(activityItem);
            
            setTimeout(() => {
                activityItem.style.opacity = '1';
                activityItem.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }, 300);
    
    // Reset refresh button
    setTimeout(() => {
        refreshBtn.style.transform = 'rotate(0deg)';
    }, 500);
}

function showAchievementDetails(card) {
    const title = card.querySelector('.achievement-title').textContent;
    const desc = card.querySelector('.achievement-desc').textContent;
    const isEarned = card.classList.contains('earned');
    
    // Create achievement details modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Achievement Details</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="achievement-details">
                    <div class="achievement-icon-large">${card.querySelector('.achievement-icon').textContent}</div>
                    <div class="achievement-title-large">${title}</div>
                    <div class="achievement-desc-large">${desc}</div>
                    <div class="achievement-status ${isEarned ? 'earned' : 'locked'}">
                        ${isEarned ? '✅ Earned' : '🔒 Locked'}
                    </div>
                    ${!isEarned ? `
                        <div class="achievement-progress-large">
                            <div class="progress-bar-large">
                                <div class="progress-fill-large" style="width: ${card.querySelector('.progress-fill').style.width}"></div>
                            </div>
                            <span class="progress-text-large">${card.querySelector('.progress-text').textContent}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add achievement modal styles
    const achievementStyles = `
        .achievement-details {
            text-align: center;
        }
        
        .achievement-icon-large {
            font-size: 64px;
            margin-bottom: 20px;
        }
        
        .achievement-title-large {
            font-family: var(--font-heading);
            font-size: 28px;
            font-weight: 700;
            color: var(--deep-forest);
            margin-bottom: 15px;
        }
        
        .achievement-desc-large {
            font-size: 18px;
            color: #666;
            margin-bottom: 25px;
        }
        
        .achievement-status {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 25px;
        }
        
        .achievement-status.earned {
            color: var(--primary-green);
        }
        
        .achievement-status.locked {
            color: #999;
        }
        
        .achievement-progress-large {
            display: flex;
            align-items: center;
            gap: 15px;
            justify-content: center;
        }
        
        .progress-bar-large {
            width: 200px;
            height: 10px;
            background: #f0f0f0;
            border-radius: 5px;
            overflow: hidden;
        }
        
        .progress-fill-large {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-green), var(--secondary-yellow));
            border-radius: 5px;
            transition: width 0.5s ease-out;
        }
        
        .progress-text-large {
            font-size: 16px;
            font-weight: 600;
            color: var(--deep-forest);
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = achievementStyles;
    document.head.appendChild(style);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function setupLeaderboardInteractions() {
    // Re-attach event listeners to new leaderboard items
    const leaderboardItems = document.querySelectorAll('.leaderboard-item');
    leaderboardItems.forEach(item => {
        item.addEventListener('click', function() {
            showNeighborProfile(this);
        });
    });
}

function showNeighborProfile(item) {
    const name = item.querySelector('.neighbor-name').textContent;
    const location = item.querySelector('.neighbor-location').textContent;
    const stats = item.querySelector('.stat-value').textContent;
    
    // Create neighbor profile modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Neighbor Profile</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="neighbor-profile">
                    <div class="profile-avatar-large">${getInitials(name)}</div>
                    <div class="profile-name">${name}</div>
                    <div class="profile-location">${location}</div>
                    <div class="profile-stats">
                        <div class="stat-item">
                            <div class="stat-value">${stats}</div>
                            <div class="stat-label">Total Traded</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">$${(Math.random() * 200 + 50).toFixed(0)}</div>
                            <div class="stat-label">Total Saved</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${(Math.random() * 50 + 10).toFixed(0)} kg</div>
                            <div class="stat-label">CO₂ Saved</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add profile modal styles
    const profileStyles = `
        .neighbor-profile {
            text-align: center;
        }
        
        .profile-avatar-large {
            width: 80px;
            height: 80px;
            background: var(--primary-green);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: 700;
            margin: 0 auto 20px;
        }
        
        .profile-name {
            font-family: var(--font-heading);
            font-size: 24px;
            font-weight: 700;
            color: var(--deep-forest);
            margin-bottom: 8px;
        }
        
        .profile-location {
            font-size: 16px;
            color: #666;
            margin-bottom: 30px;
        }
        
        .profile-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-item .stat-value {
            font-family: var(--font-mono);
            font-size: 20px;
            font-weight: 700;
            color: var(--deep-forest);
            margin-bottom: 5px;
        }
        
        .stat-item .stat-label {
            font-size: 14px;
            color: #666;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = profileStyles;
    document.head.appendChild(style);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function setupRealTimeUpdates() {
    // Update activity feed periodically
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance of new activity
            addNewActivity();
        }
    }, 30000); // Every 30 seconds
    
    // Update map cells periodically
    setInterval(() => {
        updateMapActivity();
    }, 45000); // Every 45 seconds
}

function addNewActivity() {
    const activityFeed = document.querySelector('.activity-feed');
    const activities = [
        { icon: '⚡', text: '<strong>Sarah Miller</strong> completed a trade', time: 'Just now' },
        { icon: '🌱', text: 'New CO₂ savings milestone reached', time: '1 minute ago' },
        { icon: '👋', text: '<strong>New neighbor</strong> joined the community', time: '2 minutes ago' }
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
        <div class="activity-icon">${randomActivity.icon}</div>
        <div class="activity-content">
            <div class="activity-text">${randomActivity.text}</div>
            <div class="activity-time">${randomActivity.time}</div>
        </div>
    `;
    
    activityItem.style.opacity = '0';
    activityItem.style.transform = 'translateX(-20px)';
    activityItem.style.transition = 'all 0.4s ease-out';
    
    activityFeed.insertBefore(activityItem, activityFeed.firstChild);
    
    // Remove oldest activity if more than 10
    const allActivities = activityFeed.querySelectorAll('.activity-item');
    if (allActivities.length > 10) {
        const lastActivity = allActivities[allActivities.length - 1];
        lastActivity.style.opacity = '0';
        lastActivity.style.transform = 'translateX(20px)';
        setTimeout(() => {
            lastActivity.remove();
        }, 400);
    }
    
    setTimeout(() => {
        activityItem.style.opacity = '1';
        activityItem.style.transform = 'translateX(0)';
    }, 100);
}

function updateMapActivity() {
    const mapCells = document.querySelectorAll('.map-cell');
    mapCells.forEach(cell => {
        if (Math.random() > 0.8) { // 20% chance of activity update
            const stats = cell.querySelector('.house-stats');
            const currentKWh = parseInt(stats.textContent);
            const newKWh = currentKWh + Math.floor(Math.random() * 5);
            stats.textContent = `${newKWh} kWh`;
            
            // Update cell appearance based on new value
            cell.classList.remove('active');
            if (newKWh >= 15) {
                cell.classList.add('active');
            }
        }
    });
}

function initializeAnimations() {
    // Animate achievement progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = width;
        }, 1000);
    });
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.leaderboard-item, .achievement-card, .map-cell');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

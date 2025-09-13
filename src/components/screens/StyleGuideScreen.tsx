import React from 'react';
import { Zap, Cpu, Activity, TrendingUp, Users, Settings } from 'lucide-react';

export function StyleGuideScreen() {
  return (
    <div className="min-h-screen p-8" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
            EnergyLink Design System
          </h1>
          <p className="text-xl" style={{ color: 'var(--txt-primary)' }}>
            High-Tech Energy Visual System
          </p>
        </div>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
            Color Foundation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Background Colors */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium" style={{ color: 'var(--txt-heading)' }}>Background</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-white/20" style={{ background: 'var(--bg-page)' }}></div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--txt-heading)' }}>bg.page</div>
                    <div className="text-sm" style={{ color: 'var(--txt-muted)' }}>#0B0F14</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-white/20" style={{ background: 'var(--bg-surface)' }}></div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--txt-heading)' }}>bg.surface</div>
                    <div className="text-sm" style={{ color: 'var(--txt-muted)' }}>#121820</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-white/20" style={{ background: 'var(--glass-surface)' }}></div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--txt-heading)' }}>glass.surface</div>
                    <div className="text-sm" style={{ color: 'var(--txt-muted)' }}>rgba(18,24,32,0.65)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Colors */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium" style={{ color: 'var(--txt-heading)' }}>Typography</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-white/20" style={{ background: 'var(--txt-heading)' }}></div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--txt-heading)' }}>txt.heading</div>
                    <div className="text-sm" style={{ color: 'var(--txt-muted)' }}>#FFFFFF</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-white/20" style={{ background: 'var(--txt-primary)' }}></div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--txt-heading)' }}>txt.primary</div>
                    <div className="text-sm" style={{ color: 'var(--txt-muted)' }}>#E5E7EB</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-white/20" style={{ background: 'var(--txt-muted)' }}></div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--txt-heading)' }}>txt.muted</div>
                    <div className="text-sm" style={{ color: 'var(--txt-muted)' }}>#9CA3AF</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Energy Accents */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium" style={{ color: 'var(--txt-heading)' }}>Energy Accents</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-white/20" style={{ background: 'var(--accent-energy-1)' }}></div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--txt-heading)' }}>accent.energy-1</div>
                    <div className="text-sm" style={{ color: 'var(--txt-muted)' }}>#00F5D4</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-white/20" style={{ background: 'var(--accent-energy-2)' }}></div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--txt-heading)' }}>accent.energy-2</div>
                    <div className="text-sm" style={{ color: 'var(--txt-muted)' }}>#2EF2FF</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-white/20" style={{ background: 'var(--accent-energy-3)' }}></div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--txt-heading)' }}>accent.energy-3</div>
                    <div className="text-sm" style={{ color: 'var(--txt-muted)' }}>#7DF9FF</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-white/20" style={{ background: 'var(--accent-warning)' }}></div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--txt-heading)' }}>accent.warning</div>
                    <div className="text-sm" style={{ color: 'var(--txt-muted)' }}>#FFB300</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-white/20" style={{ background: 'var(--accent-success)' }}></div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--txt-heading)' }}>accent.success</div>
                    <div className="text-sm" style={{ color: 'var(--txt-muted)' }}>#22C55E</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
            Typography
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium mb-4" style={{ color: 'var(--txt-heading)' }}>Headings</h3>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
                  H1 - Display Large (Inter Semibold)
                </h1>
                <h2 className="text-3xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
                  H2 - Display Medium (Inter Semibold)
                </h2>
                <h3 className="text-2xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
                  H3 - Display Small (Inter Semibold)
                </h3>
                <h4 className="text-xl font-medium" style={{ color: 'var(--txt-heading)' }}>
                  H4 - Heading Large (Inter Medium)
                </h4>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4" style={{ color: 'var(--txt-heading)' }}>Body Text</h3>
              <div className="space-y-3">
                <p className="text-lg" style={{ color: 'var(--txt-primary)' }}>
                  Body Large - Primary text content (Inter Regular)
                </p>
                <p className="text-base" style={{ color: 'var(--txt-primary)' }}>
                  Body Medium - Standard body text (Inter Regular)
                </p>
                <p className="text-sm" style={{ color: 'var(--txt-muted)' }}>
                  Body Small - Secondary information (Inter Regular)
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4" style={{ color: 'var(--txt-heading)' }}>Energy Highlights</h3>
              <div className="space-y-3">
                <div className="text-2xl font-semibold metric-energy-value">
                  2,847 kWh
                </div>
                <div className="text-energy-gradient text-xl font-medium">
                  Gradient Energy Text
                </div>
                <div className="text-lg" style={{ color: 'var(--accent-energy-2)' }}>
                  Cyan Accent Text
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
            Components
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium" style={{ color: 'var(--txt-heading)' }}>Buttons</h3>
              <div className="space-y-3">
                <button className="btn-energy-primary">
                  Primary Button
                </button>
                <button className="btn-energy-secondary">
                  Secondary Button
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium" style={{ color: 'var(--txt-heading)' }}>Inputs</h3>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Energy input field"
                  className="input-energy w-full"
                />
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="input-energy w-full"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium" style={{ color: 'var(--txt-heading)' }}>Tabs</h3>
              <div className="flex gap-2">
                <button className="tab-energy active">Active</button>
                <button className="tab-energy">Inactive</button>
                <button className="tab-energy">Disabled</button>
              </div>
            </div>

            {/* Icons */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium" style={{ color: 'var(--txt-heading)' }}>Icons</h3>
              <div className="flex gap-4">
                <Zap className="w-6 h-6 icon-energy-white" />
                <Cpu className="w-6 h-6 icon-energy-teal" />
                <Activity className="w-6 h-6 icon-energy-cyan" />
                <TrendingUp className="w-6 h-6 icon-energy-white" />
                <Users className="w-6 h-6 icon-energy-teal" />
                <Settings className="w-6 h-6 icon-energy-cyan" />
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Block Example */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
            Dashboard Block (Glass Panel)
          </h2>
          
          <div className="dashboard-block max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 icon-energy-teal" />
              <h3 className="text-xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
                Energy Generated
              </h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-semibold metric-energy-value">
                2,847 kWh
              </div>
              <div className="metric-energy-label">
                This month
              </div>
              <div className="metric-energy-secondary">
                +12% from last month
              </div>
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
            Background Gradients
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 rounded-lg p-4 flex items-end" style={{ background: 'var(--grad-aurora-teal)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--txt-heading)' }}>Aurora Teal</span>
            </div>
            <div className="h-32 rounded-lg p-4 flex items-end" style={{ background: 'var(--grad-deep-cyan)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--txt-heading)' }}>Deep Cyan</span>
            </div>
            <div className="h-32 rounded-lg p-4 flex items-end" style={{ background: 'var(--grad-indigo-nebula)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--txt-heading)' }}>Indigo Nebula</span>
            </div>
          </div>
        </section>

        {/* Heatmap */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
            Heatmap Cells
          </h2>
          
          <div className="flex gap-4">
            <div className="heat-energy-low w-16 h-16 rounded-lg flex items-center justify-center">
              <span className="text-xs font-medium" style={{ color: 'var(--txt-heading)' }}>Low</span>
            </div>
            <div className="heat-energy-medium w-16 h-16 rounded-lg flex items-center justify-center">
              <span className="text-xs font-medium" style={{ color: 'var(--txt-heading)' }}>Med</span>
            </div>
            <div className="heat-energy-high w-16 h-16 rounded-lg flex items-center justify-center">
              <span className="text-xs font-medium" style={{ color: 'var(--bg-page)' }}>High</span>
            </div>
          </div>
        </section>

        {/* Achievement Medals */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold" style={{ color: 'var(--txt-heading)' }}>
            Achievement Medals
          </h2>
          
          <div className="flex gap-4">
            <div className="medal-energy-gold w-16 h-16 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold" style={{ color: 'var(--gold)' }}>🥇</span>
            </div>
            <div className="medal-energy-silver w-16 h-16 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold" style={{ color: 'var(--silver)' }}>🥈</span>
            </div>
            <div className="medal-energy-bronze w-16 h-16 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold" style={{ color: 'var(--bronze)' }}>🥉</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
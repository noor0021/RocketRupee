import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const SIPSimulator: React.FC = () => {
  const navigate = useNavigate();
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12);

  const calculateSIP = () => {
    const months = years * 12;
    const monthlyRate = returnRate / 12 / 100;
    let invested = 0;
    let wealth = 0;
    const data = [];

    for (let month = 0; month <= months; month++) {
      if (month > 0) {
        invested += monthlyAmount;
        wealth = wealth * (1 + monthlyRate) + monthlyAmount;
      }
      if (month % 6 === 0 || month === months) {
        data.push({
          year: (month / 12).toFixed(1),
          invested,
          wealth: Math.round(wealth),
          returns: Math.round(wealth - invested),
        });
      }
    }
    return data;
  };

  const data = calculateSIP();
  const finalData = data[data.length - 1];
  const totalInvested = finalData.invested;
  const totalWealth = finalData.wealth;
  const totalReturns = finalData.returns;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm mb-4 transition-colors"
            style={{ fontFamily: 'var(--font-body)', color: '#555' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#06b6d4')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            <ArrowLeft className="w-4 h-4" />
            {'<< BACK TO BASE'}
          </button>

          <h1
            className="text-2xl font-black tracking-wider mb-1"
            style={{ fontFamily: 'var(--font-heading)', color: '#06b6d4' }}
          >
            SIP SIMULATOR
          </h1>
          <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#555' }}>
            // see the power of compound interest
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-6" style={{ background: 'rgba(17, 17, 17, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2
                className="text-sm font-bold tracking-wider mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: '#888', fontSize: '0.75rem' }}
              >
                PARAMETERS
              </h2>

              <div className="space-y-8">
                {/* Monthly Amount */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#ec4899]" />
                      <label className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: '#888' }}>
                        Monthly SIP
                      </label>
                    </div>
                    <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#ec4899' }}>
                      ₹{monthlyAmount.toLocaleString()}
                    </span>
                  </div>
                  <Slider value={[monthlyAmount]} onValueChange={(v) => setMonthlyAmount(v[0])} min={500} max={50000} step={500} />
                  <div className="flex justify-between text-[10px] mt-1" style={{ fontFamily: 'var(--font-body)', color: '#444' }}>
                    <span>₹500</span><span>₹50,000</span>
                  </div>
                </div>

                {/* Years */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#06b6d4]" />
                      <label className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: '#888' }}>
                        Duration
                      </label>
                    </div>
                    <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#06b6d4' }}>
                      {years}yr
                    </span>
                  </div>
                  <Slider value={[years]} onValueChange={(v) => setYears(v[0])} min={1} max={30} step={1} />
                  <div className="flex justify-between text-[10px] mt-1" style={{ fontFamily: 'var(--font-body)', color: '#444' }}>
                    <span>1yr</span><span>30yr</span>
                  </div>
                </div>

                {/* Return Rate */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-[#a855f7]" />
                      <label className="text-sm" style={{ fontFamily: 'var(--font-ui)', color: '#888' }}>
                        Expected Return
                      </label>
                    </div>
                    <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#a855f7' }}>
                      {returnRate}%
                    </span>
                  </div>
                  <Slider value={[returnRate]} onValueChange={(v) => setReturnRate(v[0])} min={1} max={20} step={0.5} />
                  <div className="flex justify-between text-[10px] mt-1" style={{ fontFamily: 'var(--font-body)', color: '#444' }}>
                    <span>1%</span><span>20%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="p-6" style={{ background: 'rgba(17, 17, 17, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2
                className="text-sm font-bold tracking-wider mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: '#888', fontSize: '0.75rem' }}
              >
                PROJECTION
              </h2>

              <div className="space-y-3">
                <div className="p-3" style={{ background: '#0a0a0a', border: '1px solid #2a2a2a' }}>
                  <p className="text-[10px] tracking-wider mb-1" style={{ fontFamily: 'var(--font-body)', color: '#555' }}>
                    TOTAL INVESTED
                  </p>
                  <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#e0e0e0' }}>
                    ₹{totalInvested.toLocaleString()}
                  </p>
                </div>

                <div className="p-3" style={{ background: '#0a0a0a', border: '1px solid #10b98140' }}>
                  <p className="text-[10px] tracking-wider mb-1" style={{ fontFamily: 'var(--font-body)', color: '#555' }}>
                    RETURNS
                  </p>
                  <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#10b981' }}>
                    ₹{totalReturns.toLocaleString()}
                  </p>
                </div>

                <div className="p-3" style={{ background: '#10b98110', border: '1px solid #10b981' }}>
                  <p className="text-[10px] tracking-wider mb-1" style={{ fontFamily: 'var(--font-body)', color: '#10b981' }}>
                    TOTAL WEALTH
                  </p>
                  <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#10b981', textShadow: '0 0 20px rgba(16,185,129,0.3)' }}>
                    ₹{totalWealth.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 p-3" style={{ background: '#a855f710', border: '1px solid #a855f740' }}>
                  <TrendingUp className="w-5 h-5 text-[#a855f7]" />
                  <div>
                    <p className="text-[10px] tracking-wider" style={{ fontFamily: 'var(--font-body)', color: '#a855f7aa' }}>
                      MULTIPLIER
                    </p>
                    <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#a855f7' }}>
                      {(totalWealth / totalInvested).toFixed(2)}x
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.15 }}
          className="mt-4"
        >
          <div className="p-6" style={{ background: 'rgba(17, 17, 17, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2
              className="text-sm font-bold tracking-wider mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: '#888', fontSize: '0.75rem' }}
            >
              GROWTH CHART
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="year" stroke="#444" style={{ fontFamily: 'var(--font-body)', fontSize: '10px' }} />
                  <YAxis stroke="#444" tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} style={{ fontFamily: 'var(--font-body)', fontSize: '10px' }} />
                  <Tooltip
                    contentStyle={{
                      background: '#111',
                      border: '1px solid #2a2a2a',
                      borderRadius: '0',
                      color: '#e0e0e0',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                    }}
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                  />
                  <Legend wrapperStyle={{ fontFamily: 'var(--font-body)', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="invested" stroke="#ec4899" fillOpacity={1} fill="url(#colorInvested)" strokeWidth={2} name="Invested" />
                  <Area type="monotone" dataKey="wealth" stroke="#06b6d4" fillOpacity={1} fill="url(#colorWealth)" strokeWidth={2} name="Wealth" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

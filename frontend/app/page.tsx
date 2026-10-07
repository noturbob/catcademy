'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trophy, Zap, BookOpen, Users, TrendingUp, Sparkles, ArrowRight, CheckCircle2, Code2 } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 backdrop-blur-xl bg-slate-900/50 border-b border-slate-700/50"
      >
        <motion.div
          className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Catcademy
        </motion.div>
        <div className="flex gap-4">
          <Link href="/login">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" className="text-white hover:text-indigo-400 hover:bg-slate-700/50">Login</Button>
            </motion.div>
          </Link>
          <Link href="/signup">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white border-0">
                Sign Up <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-20 md:py-32">
        <motion.div
          className="max-w-4xl text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-indigo-500/30 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">Your AI-powered CAT companion</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Master CAT
            </span>
            <br />
            <span className="text-slate-300">Like Never Before</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Weekly mocks with real percentiles. AI-generated practice questions. Speed prerequisites mastery. Everything you need in one stunning platform.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-3 gap-4 mb-12 max-w-md mx-auto"
          >
            {[
              { label: 'Active Users', value: '2,400+' },
              { label: 'Questions', value: '50K+' },
              { label: 'Avg Score ↑', value: '42%' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3"
                whileHover={{ borderColor: 'rgb(129, 140, 248)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl font-bold text-indigo-400">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex gap-4 justify-center flex-wrap mb-12"
          >
            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-600 hover:from-indigo-600 hover:via-cyan-600 hover:to-indigo-700 text-white border-0 font-semibold px-8"
                >
                  Start Preparing Free <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-indigo-300 font-semibold"
              >
                Explore Features
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Proof */}
          <motion.p
            variants={fadeInUp}
            className="text-sm text-slate-500 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            Join 2,400+ aspirants preparing for CAT 2025
          </motion.p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 md:px-12 py-24 border-t border-slate-700/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Why Choose Catcademy?
              </span>
            </h2>
            <p className="text-slate-400 text-lg">Everything you need to crush the CAT exam</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Trophy,
                title: 'Weekly Mocks',
                description: 'Full-length CAT-style mocks with real-time percentile calculations and AI-powered feedback',
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                icon: Zap,
                title: 'AI Practice',
                description: 'AI-generated questions tailored to your weak areas for laser-focused improvement',
                color: 'from-cyan-500 to-blue-600'
              },
              {
                icon: BookOpen,
                title: 'Speed Modules',
                description: 'Master multiplication tables, logs, squares, and other prerequisites with interactive games',
                color: 'from-violet-500 to-indigo-600'
              },
              {
                icon: TrendingUp,
                title: 'Analytics',
                description: 'Comprehensive performance tracking, weak area identification, and personalized study plans',
                color: 'from-amber-500 to-orange-600'
              },
              {
                icon: Users,
                title: 'Leaderboard',
                description: 'Compete with peers, benchmark your performance, and stay motivated with live rankings',
                color: 'from-pink-500 to-rose-600'
              },
              {
                icon: Code2,
                title: 'Previous Years',
                description: 'Access and practice 5 years of actual CAT questions with detailed solutions',
                color: 'from-emerald-500 to-teal-600'
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={fadeInScale}
                  whileHover={{ y: -10, borderColor: 'rgb(129, 140, 148)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 p-6 hover:border-indigo-500/50">
                    <motion.div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 md:px-12 py-24 border-t border-slate-700/50 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Loved by Top Performers
              </span>
            </h2>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { name: 'Arjun S.', score: '99.2 percentile', comment: 'Catcademy mocks were incredibly accurate. Helped me stay calm during the actual exam.' },
              { name: 'Priya M.', score: '97.8 percentile', comment: 'The weak area detection and AI practice is game-changing. Saved me so much study time.' },
              { name: 'Rohit K.', score: '99.5 percentile', comment: 'Best platform for CAT prep. The speed modules made me unbeatable in calculation sections.' },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400">★</span>
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-indigo-400">{testimonial.score}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 md:px-12 py-24"
      >
        <motion.div
          className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600/20 via-cyan-600/20 to-indigo-600/20 border border-indigo-500/30 rounded-2xl p-12 text-center backdrop-blur-xl"
          whileHover={{ borderColor: 'rgb(129, 140, 248, 0.6)' }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your CAT Prep?</h2>
          <p className="text-slate-300 mb-8 text-lg">Join thousands of successful candidates. Start preparing smarter today.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white border-0 font-semibold px-8">
                  Get Started Free
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 md:px-12 py-8 border-t border-slate-700/50 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-slate-400">© 2025 Catcademy. Built with passion for CAT aspirants.</p>
            <div className="flex gap-6">
              <motion.a
                href="#"
                className="text-slate-400 hover:text-indigo-400 flex items-center gap-2"
                whileHover={{ scale: 1.1, x: 5 }}
              >
                <Code2 className="w-4 h-4" /> GitHub
              </motion.a>
              <motion.a
                href="#"
                className="text-slate-400 hover:text-indigo-400"
                whileHover={{ scale: 1.1 }}
              >
                Twitter
              </motion.a>
              <motion.a
                href="#"
                className="text-slate-400 hover:text-indigo-400"
                whileHover={{ scale: 1.1 }}
              >
                LinkedIn
              </motion.a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

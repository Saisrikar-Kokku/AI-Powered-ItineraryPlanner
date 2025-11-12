'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/SectionTitle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Notification } from '@/components/Notification'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  ArrowRight,
  Send,
  CheckCircle,
  Users,
  MessageSquare,
  Heart
} from 'lucide-react'
import { addToWaitlist } from '@/lib/supabase'

interface FormData {
  name: string
  email: string
  message: string
}

interface NotificationState {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  isVisible: boolean
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<NotificationState>({
    type: 'info',
    title: '',
    message: '',
    isVisible: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Debug logging
    console.log('Form data:', formData)
    console.log('Environment check:', {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
    })

    try {
      const result = await addToWaitlist({
        name: formData.name,
        email: formData.email,
        message: formData.message
      })

      console.log('Waitlist signup successful:', result)

      setNotification({
        type: 'success',
        title: 'Success!',
        message: 'Thank you for joining our waitlist. We\'ll be in touch soon!',
        isVisible: true
      })

      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Waitlist signup error:', error)
      setNotification({
        type: 'error',
        title: 'Error',
        message: `Failed to join waitlist: ${error instanceof Error ? error.message : 'Unknown error'}`,
        isVisible: true
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'smart@aiitinerary.com',
      action: 'mailto:smart@aiitinerary.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: '+91 8896246224',
      action: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Hyderabad,mruh',
      action: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'Mon - Fri, 9AM - 6PM PST',
      action: '#'
    }
  ]

  const faqs = [
    {
      question: 'When will the platform be available?',
      answer: 'We\'re currently in beta testing and plan to launch publicly in Q2 2024. Join our waitlist to get early access!'
    },
    {
      question: 'How much will it cost?',
      answer: 'We\'re finalizing our pricing structure. Early users will receive special discounts and lifetime access benefits.'
    },
    {
      question: 'Which destinations are supported?',
      answer: 'Our platform will support 50+ countries at launch, with plans to expand to 100+ destinations by end of 2024.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption and never share your personal information without your consent.'
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Ready to transform your travel planning? Join our waitlist and be among the first 
              to experience the future of AI-powered itineraries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Join Our Waitlist</CardTitle>
                  <CardDescription>
                    Be the first to know when we launch and get exclusive early access benefits.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message (Optional)
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your travel interests or any questions you have..."
                        rows={4}
                        className="w-full"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      variant="gradient"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Joining Waitlist...'
                      ) : (
                        <>
                          Join Waitlist
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <SectionTitle
                  title="Contact Information"
                  subtitle="We'd love to hear from you"
                  centered={false}
                  className="mb-8"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                          <info.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                        <p className="text-gray-600">{info.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Waitlist Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Early access to the platform</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Exclusive launch discounts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Priority customer support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-gray-700">Beta testing opportunities</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our platform"
            className="mb-16"
          />
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 text-primary">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">5,000+</div>
              <p className="text-gray-600">Waitlist Members</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">50+</div>
              <p className="text-gray-600">Countries Supported</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">95%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Transform Your Travel Planning?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of travelers who are already on our waitlist. 
              Be among the first to experience the future of AI-powered travel planning.
            </p>
            <Button size="xl" variant="secondary" asChild>
              <a href="#contact-form">
                Join Waitlist Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Notification */}
      <Notification
        type={notification.type}
        title={notification.title}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </div>
  )
}

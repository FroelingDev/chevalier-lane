import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scroll = totalScroll / windowHeight
      setScrollProgress(scroll * 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-scale-in, .scroll-slide-left, .scroll-slide-right')
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Indicator */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(184, 134, 11, 0.1) 0%, rgba(26, 26, 26, 0.6) 50%, rgba(212, 175, 55, 0.1) 100%),
              linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)),
              url('/hero-section.png')
            `
          }}
        />

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(184,134,11,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center">
              <div className="scroll-fade-in">
                <h1 className="text-5xl md:text-7xl xl:text-8xl luxury-display text-white mb-8 tracking-wider leading-tight drop-shadow-2xl">
                  Contact Us
                </h1>
                <div className="gold-separator mx-auto w-64 mb-8"></div>
                <p className="text-xl md:text-2xl lg:text-3xl font-playfair text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                  Ready to experience unparalleled luxury transportation?
                  <span className="text-luxury-gold italic"> Get in touch with us today.</span>
                </p>
              </div>

              <div className="scroll-scale-in grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="backdrop-blur-md bg-black/30 p-8 rounded-lg border border-luxury-gold/30 shadow-2xl text-center group hover:bg-black/40 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/20 rounded-full mb-6 group-hover:bg-luxury-gold/30 transition-all duration-300">
                    <Phone className="h-8 w-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-2xl luxury-heading text-white mb-4">Call Us</h3>
                  <p className="text-lg text-white/90 font-playfair mb-2">+351 912 345 678</p>
                  <p className="text-sm text-white/70">24/7 Available</p>
                </div>

                <div className="backdrop-blur-md bg-black/30 p-8 rounded-lg border border-luxury-gold/30 shadow-2xl text-center group hover:bg-black/40 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/20 rounded-full mb-6 group-hover:bg-luxury-gold/30 transition-all duration-300">
                    <Mail className="h-8 w-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-2xl luxury-heading text-white mb-4">Email Us</h3>
                  <p className="text-lg text-white/90 font-playfair mb-2">info@chevalierlane.com</p>
                  <p className="text-sm text-white/70">We reply within 2 hours</p>
                </div>

                <div className="backdrop-blur-md bg-black/30 p-8 rounded-lg border border-luxury-gold/30 shadow-2xl text-center group hover:bg-black/40 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/20 rounded-full mb-6 group-hover:bg-luxury-gold/30 transition-all duration-300">
                    <MapPin className="h-8 w-8 text-luxury-gold" />
                  </div>
                  <h3 className="text-2xl luxury-heading text-white mb-4">Visit Us</h3>
                  <p className="text-lg text-white/90 font-playfair mb-2">Lisbon, Portugal</p>
                  <p className="text-sm text-white/70">By appointment only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-3 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.03)_25%,rgba(184,134,11,0.03)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.03)_75%)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_3px_3px,rgba(184,134,11,0.04)_1px,transparent_0)] bg-[length:28px_28px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-fade-in">
            <h2 className="text-5xl md:text-7xl luxury-display text-luxury-black mb-6 tracking-wider">
              Send Us a Message
            </h2>
            <div className="gold-separator mx-auto w-64 mb-8"></div>
            <p className="text-xl font-playfair text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Whether you need transportation for a special occasion, business meeting, or simply wish to experience
              the pinnacle of luxury travel, we're here to make it happen.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="scroll-slide-left">
              <div className="bg-white rounded-sm shadow-luxury-soft p-8 border border-luxury-gold/10 hover:shadow-luxury transition-all duration-500">
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"></div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-luxury-gold mx-auto mb-6" />
                    <h3 className="text-2xl luxury-heading text-luxury-black mb-4">Message Sent Successfully!</h3>
                    <p className="text-lg font-playfair text-gray-700">
                      Thank you for contacting us. We'll get back to you within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm luxury-sans-medium text-luxury-black mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-luxury-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all duration-300 bg-luxury-ivory/50"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm luxury-sans-medium text-luxury-black mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-luxury-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all duration-300 bg-luxury-ivory/50"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm luxury-sans-medium text-luxury-black mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-luxury-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all duration-300 bg-luxury-ivory/50"
                          placeholder="+351 912 345 678"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm luxury-sans-medium text-luxury-black mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-luxury-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all duration-300 bg-luxury-ivory/50"
                        >
                          <option value="">Select a subject</option>
                          <option value="booking">Booking Inquiry</option>
                          <option value="corporate">Corporate Services</option>
                          <option value="special-event">Special Event</option>
                          <option value="general">General Information</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm luxury-sans-medium text-luxury-black mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-luxury-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all duration-300 bg-luxury-ivory/50 resize-none"
                        placeholder="Please describe your requirements and any specific details..."
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="btn-luxury-premium w-full text-lg group"
                      >
                        <span>Send Message</span>
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                      </button>
                    </div>
                  </form>
                )}

                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"></div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="scroll-slide-right space-y-8">
              <div className="bg-gradient-to-br from-white via-luxury-ivory to-luxury-pearl rounded-sm shadow-luxury-soft p-8 border border-luxury-gold/10">
                <h3 className="text-2xl luxury-heading text-luxury-black mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="luxury-sans-medium text-luxury-black mb-1">Phone</h4>
                      <p className="text-gray-700 font-playfair">+351 912 345 678</p>
                      <p className="text-sm text-gray-600">Available 24/7 for urgent requests</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="luxury-sans-medium text-luxury-black mb-1">Email</h4>
                      <p className="text-gray-700 font-playfair">info@chevalierlane.com</p>
                      <p className="text-sm text-gray-600">We respond within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="luxury-sans-medium text-luxury-black mb-1">Location</h4>
                      <p className="text-gray-700 font-playfair">Lisbon, Portugal</p>
                      <p className="text-sm text-gray-600">Serving all of Portugal and beyond</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h4 className="luxury-sans-medium text-luxury-black mb-1">Business Hours</h4>
                      <p className="text-gray-700 font-playfair">Monday - Sunday</p>
                      <p className="text-sm text-gray-600">24/7 Service Available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-sm shadow-luxury-soft p-8 border border-luxury-gold/10">
                <h3 className="text-2xl luxury-heading text-luxury-black mb-6">Why Choose Us?</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl luxury-display text-luxury-gold mb-2">24/7</div>
                    <div className="luxury-sans-medium text-luxury-black text-sm">Service</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl luxury-display text-luxury-gold mb-2">15+</div>
                    <div className="luxury-sans-medium text-luxury-black text-sm">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl luxury-display text-luxury-gold mb-2">50+</div>
                    <div className="luxury-sans-medium text-luxury-black text-sm">Luxury Vehicles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl luxury-display text-luxury-gold mb-2">100%</div>
                    <div className="luxury-sans-medium text-luxury-black text-sm">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-luxury-black via-luxury-midnight to-luxury-black relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        />

        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_2px_2px,rgba(184,134,11,0.4)_1px,transparent_0)] bg-[length:30px_30px]"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl luxury-display text-white mb-8 tracking-wider">
            Ready to Begin Your Journey?
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the pinnacle of luxury transportation. Every detail crafted to perfection,
            every moment designed for <span className="text-luxury-gold italic">unforgettable elegance</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:+351912345678" className="btn-luxury-premium text-xl px-8 py-4 group">
              <Phone className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>Call Now</span>
            </a>
            <a href="mailto:info@chevalierlane.com" className="btn-luxury-outline-premium text-xl px-8 py-4 group">
              <Mail className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
              <span>Send Email</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

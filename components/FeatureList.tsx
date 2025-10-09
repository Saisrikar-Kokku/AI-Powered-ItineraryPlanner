import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureListProps {
  features: string[]
  className?: string
  delay?: number
}

export function FeatureList({ features, className, delay = 0 }: FeatureListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={cn("space-y-4", className)}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: delay + index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-center space-x-3"
        >
          <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
          <span className="text-lg text-foreground">{feature}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
  className?: string
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0,
  className 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <Card className={cn(
        "h-full hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm",
        className
      )}>
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

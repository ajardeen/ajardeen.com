import { useState } from 'react'
import { motion } from 'framer-motion'
import { Panel, PanelContent } from '@/components/panel'
import { Lock, ShieldAlert } from 'lucide-react'

function SecurityBanner() {
  const [clicks, setClicks] = useState(0)
  const [isUnauthorized, setIsUnauthorized] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const handleClick = () => {
    if (isUnauthorized) return
    
    const nextCount = clicks + 1
    setClicks(nextCount)

    if (nextCount >= 4) {
      setIsUnauthorized(true)
      setIsShaking(true)
      
      // Stop shaking movement after 1.5s
      setTimeout(() => setIsShaking(false), 1500)

      // Reset theme and clicks after 5s
      setTimeout(() => {
        setIsUnauthorized(false)
        setClicks(0)
      }, 5000)
    }
  }

  return (
    <Panel id="security">
      <PanelContent>
        <motion.div 
          onClick={handleClick}
          animate={{ 
            backgroundColor: isUnauthorized ? "#fee2e2" : "transparent",
            color: isUnauthorized ? "#dc2626" : "inherit" 
          }}
          transition={{ duration: 0.3 }}
          className='flex flex-col justify-center items-center gap-2 py-6 px-4 text-center md:text-left cursor-pointer rounded-xl select-none transition-all'
        >
          {/* Only the icon shakes */}
          <motion.div
            animate={isShaking ? {
              x: [0, -5, 5, -5, 5, -5, 5, 0],
            } : { x: 0 }}
            transition={{ 
              duration: 0.4, 
              repeat: isShaking ? Infinity : 0 
            }}
          >
            {isUnauthorized ? <ShieldAlert size={32} /> : <Lock size={24} />}
          </motion.div>

          <div className='max-w-md'>
            <h4 className='text-lg font-semibold'>
              {isUnauthorized 
                ? 'NOT AUTHORIZED' 
                : 'Security is not a feature; it is a foundation.'}
            </h4>
          </div>
        </motion.div>
      </PanelContent>
    </Panel>
  )
}

export default SecurityBanner
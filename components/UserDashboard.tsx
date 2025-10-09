'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Star,
  Edit3,
  Share2,
  Download,
  Trash2,
  Eye,
  Heart,
  Clock,
  Plane
} from 'lucide-react'

interface Itinerary {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  travelers: number
  budget: string
  status: 'draft' | 'active' | 'completed'
  rating?: number
  image: string
  days: number
  activities: number
}

const mockItineraries: Itinerary[] = [
  {
    id: '1',
    title: 'Golden Triangle Tour',
    destination: 'Delhi, Agra, Jaipur',
    startDate: '2024-03-15',
    endDate: '2024-03-20',
    travelers: 2,
    budget: '₹45,000',
    status: 'active',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
    days: 5,
    activities: 25
  },
  {
    id: '2',
    title: 'Kerala Backwaters',
    destination: 'Kochi, Alleppey, Munnar',
    startDate: '2024-04-10',
    endDate: '2024-04-15',
    travelers: 2,
    budget: '₹65,000',
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop',
    days: 5,
    activities: 20
  },
  {
    id: '3',
    title: 'Goa Beach Paradise',
    destination: 'North Goa, South Goa',
    startDate: '2024-02-20',
    endDate: '2024-02-25',
    travelers: 4,
    budget: '₹35,000',
    status: 'completed',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
    days: 5,
    activities: 30
  }
]

const getStatusColor = (status: Itinerary['status']) => {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800'
    case 'active': return 'bg-green-100 text-green-800'
    case 'completed': return 'bg-blue-100 text-blue-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: Itinerary['status']) => {
  switch (status) {
    case 'draft': return Edit3
    case 'active': return Plane
    case 'completed': return Star
    default: return Edit3
  }
}

export function UserDashboard() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'draft' | 'active' | 'completed'>('all')
  const [favoriteItineraries, setFavoriteItineraries] = useState<Set<string>>(new Set(['1', '3']))

  const filteredItineraries = selectedTab === 'all' 
    ? mockItineraries 
    : mockItineraries.filter(itinerary => itinerary.status === selectedTab)

  const toggleFavorite = (itineraryId: string) => {
    const newFavorites = new Set(favoriteItineraries)
    if (newFavorites.has(itineraryId)) {
      newFavorites.delete(itineraryId)
    } else {
      newFavorites.add(itineraryId)
    }
    setFavoriteItineraries(newFavorites)
  }

  const createNewItinerary = () => {
    console.log('Creating new itinerary...')
    // In a real app, this would navigate to the itinerary builder
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">My Itineraries</h1>
          <p className="text-gray-600">Manage and organize your travel plans</p>
        </div>
        <Button onClick={createNewItinerary} variant="gradient" className="mt-4 md:mt-0">
          <Plus className="w-5 h-5 mr-2" />
          Create New Itinerary
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockItineraries.length}</p>
                <p className="text-sm text-gray-600">Total Itineraries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockItineraries.filter(i => i.status === 'active').length}
                </p>
                <p className="text-sm text-gray-600">Active Trips</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockItineraries.filter(i => i.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{favoriteItineraries.size}</p>
                <p className="text-sm text-gray-600">Favorites</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'all', label: 'All', count: mockItineraries.length },
          { key: 'draft', label: 'Drafts', count: mockItineraries.filter(i => i.status === 'draft').length },
          { key: 'active', label: 'Active', count: mockItineraries.filter(i => i.status === 'active').length },
          { key: 'completed', label: 'Completed', count: mockItineraries.filter(i => i.status === 'completed').length }
        ].map((tab) => (
          <Button
            key={tab.key}
            variant={selectedTab === tab.key ? 'default' : 'ghost'}
            onClick={() => setSelectedTab(tab.key as any)}
            className={`flex items-center space-x-2 ${
              selectedTab === tab.key ? 'gradient-bg shadow-sm' : ''
            }`}
          >
            <span>{tab.label}</span>
            <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs">
              {tab.count}
            </span>
          </Button>
        ))}
      </div>

      {/* Itineraries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItineraries.map((itinerary, index) => {
          const StatusIcon = getStatusIcon(itinerary.status)
          const isFavorite = favoriteItineraries.has(itinerary.id)
          
          return (
            <motion.div
              key={itinerary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full hover-lift border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(itinerary.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="capitalize">{itinerary.status}</span>
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(itinerary.id)}
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{itinerary.title}</h3>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{itinerary.destination}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{itinerary.days} days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{itinerary.travelers} travelers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span>{itinerary.budget}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{itinerary.activities} activities</span>
                      </div>
                    </div>

                    {itinerary.rating && (
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span className="text-sm font-medium">{itinerary.rating}</span>
                        <span className="text-sm text-gray-600">rating</span>
                      </div>
                    )}

                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {filteredItineraries.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No itineraries found</h3>
          <p className="text-gray-600 mb-6">
            {selectedTab === 'all' 
              ? "You haven't created any itineraries yet." 
              : `You don't have any ${selectedTab} itineraries.`
            }
          </p>
          <Button onClick={createNewItinerary} variant="gradient">
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Itinerary
          </Button>
        </div>
      )}
    </div>
  )
}

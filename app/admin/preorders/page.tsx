"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PreOrder {
  id: string
  first_name: string
  last_name: string
  email: string
  created_at: string
}

export default function PreOrdersAdminPage() {
  const [preOrders, setPreOrders] = useState<PreOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPreOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/preorders')
      if (response.ok) {
        const data = await response.json()
        setPreOrders(data.preOrders || [])
        setError(null)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to fetch pre-orders')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPreOrders()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'First Name', 'Last Name', 'Email', 'Created At'],
      ...preOrders.map(order => [
        order.id,
        order.first_name,
        order.last_name,
        order.email,
        order.created_at
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `preorders-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100/50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extralight text-stone-800 mb-4">Pre-Orders Management</h1>
          <p className="text-stone-600">View and manage BalanX-Bio pre-orders from the database.</p>
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border-stone-200/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-extralight text-stone-800">
              Pre-Orders ({preOrders.length})
            </CardTitle>
            <div className="flex gap-4">
              <Button
                onClick={fetchPreOrders}
                disabled={loading}
                variant="outline"
                className="font-extralight"
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button
                onClick={exportToCSV}
                disabled={preOrders.length === 0}
                className="bg-stone-700 hover:bg-stone-800 font-extralight"
              >
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-stone-700"></div>
                <p className="mt-2 text-stone-600 font-extralight">Loading pre-orders...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-700 font-extralight">{error}</p>
              </div>
            )}

            {!loading && !error && preOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-stone-600 font-extralight">No pre-orders found.</p>
              </div>
            )}

            {!loading && !error && preOrders.length > 0 && (
              <div className="overflow-x-auto">
                <Table className="bg-black rounded-lg">
                  <TableHeader className="bg-gray-900">
                    <TableRow className="border-gray-700 hover:bg-gray-800">
                      <TableHead className="font-extralight text-white border-gray-700">ID</TableHead>
                      <TableHead className="font-extralight text-white border-gray-700">Name</TableHead>
                      <TableHead className="font-extralight text-white border-gray-700">Email</TableHead>
                      <TableHead className="font-extralight text-white border-gray-700">Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-black">
                    {preOrders.map((order) => (
                      <TableRow key={order.id} className="border-gray-700 hover:bg-gray-800">
                        <TableCell className="font-mono text-xs text-gray-300 border-gray-700">
                          {order.id}
                        </TableCell>
                        <TableCell className="font-extralight text-white border-gray-700">
                          {order.first_name} {order.last_name}
                        </TableCell>
                        <TableCell className="font-extralight text-white border-gray-700">
                          {order.email}
                        </TableCell>
                        <TableCell className="font-extralight text-gray-300 border-gray-700">
                          {formatDate(order.created_at)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
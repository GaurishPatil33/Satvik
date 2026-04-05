import React from 'react'

export const ProductNotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            {/* <div className="bg-white px-4 py-2 text-sm text-gray-600">
          <div className="max-w-7xl mx-auto">
            Home / Products
          </div>
        </div> */}

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center min-h-[500px] bg-white rounded-lg shadow-sm p-12">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-3 items-center flex justify-center">
                        Product Not Found
                    </h2>
                    <p className="text-gray-600 text-center mb-8 max-w-md">
                        Sorry, we couldn't find the product you're looking
                        for. It may have been removed or is currently unavailable.
                    </p>
                </div>
            </div>
        </div>
    )
}

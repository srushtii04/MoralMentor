import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import resourceService from "../services/resourceService";

// Import all image assets
import ethicsIntroImg from "../assets/ethics-intro.png";
import beyondgoodandevilImg from "../assets/beyondgoodandevil.png";
import meditationsImg from "../assets/meditations.png";
import aristotleEthicsImg from "../assets/aristotle-ethics.png";
import dhammapada from "../assets/dhammapada.png";
import discourseMethod from "../assets/discourseonmethod.png";
import metaphysicsOfMorals from "../assets/metaphysicsofmorals.png";
import methodsOfEthics from "../assets/methodsofethics.png";
import theRepublic from "../assets/therepublic.png";
import utilitarianism from "../assets/utilitarianism.png";
import zarathustra from "../assets/zarathustra.png";
import analects from "../assets/analects.png";

const ResourcesPage = () => {
  // State for resources, loading, error, pagination and filtering
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filtering state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  const defaultBooks = [
    {
      id: 1,
      title: "Introduction to Philosophy: Ethics",
      author: "George Matthews",
      image: ethicsIntroImg,
      downloadUrl: "https://open.lib.umn.edu/intro-to-phil-ethics/",
      type: "books"
    },
    {
      id: 2,
      title: "Beyond Good and Evil",
      author: "Friedrich Nietzsche",
      image: beyondgoodandevilImg,
      downloadUrl: "https://www.gutenberg.org/ebooks/4363",
      type: "books"
    },
    {
      id: 3,
      title: "Meditations",
      author: "Marcus Aurelius",
      image: meditationsImg,
      downloadUrl: "https://www.gutenberg.org/ebooks/2680",
      type: "books"
    },
    {
      id: 4,
      title: "An Introduction to Aristotle's Ethics",
      author: "Aristotle",
      image: aristotleEthicsImg,
      downloadUrl: "https://www.gutenberg.org/ebooks/8438",
      type: "books"
    },
    {
      id: 5,
      title: "The Dhammapada",
      author: "Buddha",
      image: dhammapada,
      downloadUrl: "https://www.gutenberg.org/ebooks/2017",
      type: "books"
    },
    {
      id: 6,
      title: "Discourse on the Method",
      author: "René Descartes",
      image: discourseMethod,
      downloadUrl: "https://www.gutenberg.org/ebooks/59",
      type: "books"
    },
    {
      id: 7,
      title: "Groundwork of the Metaphysics of Morals",
      author: "Immanuel Kant",
      image: metaphysicsOfMorals,
      downloadUrl: "https://www.gutenberg.org/ebooks/5682",
      type: "books"
    },
    {
      id: 8,
      title: "The Methods of Ethics",
      author: "Henry Sidgwick",
      image: methodsOfEthics,
      downloadUrl: "https://www.gutenberg.org/ebooks/46743",
      type: "books"
    },
    {
      id: 9,
      title: "The Republic",
      author: "Plato",
      image: theRepublic,
      downloadUrl: "https://www.gutenberg.org/ebooks/1497",
      type: "books"
    },
    {
      id: 10,
      title: "Utilitarianism",
      author: "John Stuart Mill",
      image: utilitarianism,
      downloadUrl: "https://www.gutenberg.org/ebooks/11224",
      type: "books"
    },
    {
      id: 11,
      title: "Thus Spoke Zarathustra",
      author: "Friedrich Nietzsche",
      image: zarathustra,
      downloadUrl: "https://www.gutenberg.org/ebooks/1998",
      type: "books"
    },
    {
      id: 12,
      title: "The Analects of Confucius",
      author: "Confucius",
      image: analects,
      downloadUrl: "https://www.gutenberg.org/ebooks/3330",
      type: "books"
    }

  ];

  // Fetch and filter resources
  useEffect(() => {
    setLoading(true);
    
    // Filter books based on search term if needed
    let filteredBooks = defaultBooks;
    
    if (searchTerm) {
      filteredBooks = defaultBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (filterType !== 'all') {
      filteredBooks = filteredBooks.filter(book => book.type === filterType);
    }
    
    setResources(filteredBooks);
    setTotalPages(Math.ceil(filteredBooks.length / resourcesPerPage));
    setLoading(false);
  }, [searchTerm, filterType, resourcesPerPage]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle download - redirect to the book's official website
  const handleDownload = (resource) => {
    window.open(resource.downloadUrl || resource.fileUrl, '_blank');
  };

  // Get current resources for current page
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = resources.slice(indexOfFirstResource, indexOfLastResource);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-purple-100 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Resource Library</h1>

          {/* Search and Filter Controls */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full p-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div>
              <select
                className="p-2 border border-gray-300 rounded bg-white"
                value={filterType}
                onChange={handleFilterChange}
              >
                <option value="all">All Resources</option>
                <option value="books">Books</option>
                <option value="articles">Articles</option>
                <option value="videos">Videos</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
              <p className="mt-2">Loading resources...</p>
            </div>
          ) : (
            <>
              {/* Error Message */}
              {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                  {error}
                </div>
              )}

              {/* Resources Grid - Only showing current page items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentResources.map((resource) => (
                  <div key={resource._id || resource.id} className="flex flex-col">
                    {/* Book Cover */}
                    <div className="h-72 mb-4 overflow-hidden bg-gray-100 p-2 border border-gray-200">
                      <img
                        src={resource.fileUrl || resource.image}
                        alt={`${resource.title} cover`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Resource Details */}
                    <div className="p-2 mb-3">
                      <h3 className="font-bold">{resource.title}</h3>
                      {resource.author && (
                        <p className="text-sm text-gray-600">{resource.author}</p>
                      )}
                    </div>
                    
                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(resource)}
                      className="bg-purple-200 hover:bg-purple-300 text-black py-3 text-center font-medium mb-3 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination Controls*/}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center">
                    <button
                      onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-purple-500 text-white hover:bg-purple-600"
                      }`}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${
                          currentPage === index + 1
                            ? "bg-purple-700 text-white"
                            : "bg-purple-200 hover:bg-purple-300"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => 
                        currentPage < totalPages && 
                        paginate(currentPage + 1)
                      }
                      disabled={currentPage >= totalPages}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage >= totalPages
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-purple-500 text-white hover:bg-purple-600"
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResourcesPage;
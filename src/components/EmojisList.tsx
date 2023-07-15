import { join } from 'path';
import React,{useState} from 'react';
import "./style.css";

export interface ApiResponse {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
}

interface EmojisListProps {
  emojisList: ApiResponse[] | null;
}

function EmojisList({ emojisList }: EmojisListProps) {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const emojisPerPage = 10;


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  const filteredEmojisList = emojisList
    ? emojisList.filter((emoji) =>
        emoji.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

      // Pagination logic
  
      const indexOfLastEmoji = currentPage * emojisPerPage;
      const indexOfFirstEmoji = indexOfLastEmoji - emojisPerPage;
      const currentEmojis = filteredEmojisList
        ? filteredEmojisList.slice(indexOfFirstEmoji, indexOfLastEmoji)
        : null;
    
      const pageNumbers = filteredEmojisList
        ? Math.ceil(filteredEmojisList.length / emojisPerPage)
        : 0;
    
      const maxVisibleButtons = 10; // Maximum number of visible pagination buttons
      const maxVisibleButtonsHalf = Math.floor(maxVisibleButtons / 2);
    
      let startPage = 1;
      let endPage = pageNumbers;
    
      if (pageNumbers > maxVisibleButtons) {
        if (currentPage <= maxVisibleButtonsHalf) {
          endPage = maxVisibleButtons;
        } else if (currentPage + maxVisibleButtonsHalf >= pageNumbers) {
          startPage = pageNumbers - maxVisibleButtons + 1;
        } else {
          startPage = currentPage - maxVisibleButtonsHalf;
          endPage = currentPage + maxVisibleButtonsHalf;
        }
      }
    
      const renderPageNumbers = Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
        const pageNumber = startPage + index;
        return (
          <li
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            <a>{pageNumber}</a>
          </li>
        );
      });
    return (  
    <div className='container'>  
      <div className="search-input">
        <input
          type="text"
          placeholder="Search by category..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    <div className="emoji-container">
        {currentEmojis ? (
          currentEmojis.map((item: ApiResponse, index) => (
            <div className="emoji-card" key={index}>
            <div className="emoji-content">
              
              <span>
              <span className='heading'>Name - </span> {item.name.charAt(0).toLocaleUpperCase() + item.name.slice(1)}
              </span>
              <span>
              <span className='heading'>Category - </span>{item.category.charAt(0).toLocaleUpperCase() + item.category.slice(1)}
              </span>
              <span>
              <span className='heading'>Group - </span>{item.group.charAt(0).toLocaleUpperCase() + item.group.slice(1)}
              </span>
              <span className="emoji-html"  dangerouslySetInnerHTML={{ __html: item.htmlCode.join('') }} />
            </div>
          </div>
          ))
        ) : (
          <div>Loading</div>
        )}
    </div>
      <div className='pagination'>
        {renderPageNumbers}
      </div>
    </div>
  );
}

export default EmojisList;
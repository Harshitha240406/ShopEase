import React from 'react';

const CategoryFilter = ({ categories = [], selectedCategory, onSelectCategory }) => {
  const allCategories = ['all', ...categories];

  const formatCategoryName = (name) => {
    if (name === 'all') return 'All Categories';
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {allCategories.map((cat) => {
        const isSelected = (selectedCategory === cat) || (selectedCategory === '' && cat === 'all');
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat === 'all' ? '' : cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              isSelected
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {formatCategoryName(cat)}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;

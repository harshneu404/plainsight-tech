// styles/taskStyles.js
export const taskStyles = {
    taskGrid: `
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      gap-4 
      p-4
    `,
  
    taskCard: `
      bg-white 
      rounded-xl 
      p-5 
      shadow-sm 
      hover:shadow-md 
      transition-all 
      duration-200 
      border 
      border-slate-100
      min-h-[200px]
      flex 
      flex-col
    `,
  
    inputField: `
      w-full
      px-3 
      py-2 
      bg-white 
      border 
      border-slate-200 
      rounded-lg 
      focus:outline-none 
      focus:border-blue-400 
      focus:ring-1 
      focus:ring-blue-400
    `,
  
    titleText: `
      text-lg 
      font-medium 
      text-slate-800 
      cursor-pointer 
      hover:bg-slate-50 
      p-2 
      rounded-md 
      transition-colors
    `,
  
    descriptionText: `
      mt-2 
      text-slate-600 
      cursor-pointer 
      hover:bg-slate-50 
      p-2 
      rounded-md 
      transition-colors
      flex-grow
    `,
  
    statusSelect: `
      px-3 
      py-1.5 
      bg-white 
      border 
      border-slate-200 
      rounded-lg 
      text-sm 
      text-slate-600 
      focus:outline-none 
      focus:border-blue-400 
      focus:ring-1 
      focus:ring-blue-400
      min-w-[120px]
    `,
  
    deleteButton: `
      px-3 
      py-1.5 
      text-sm 
      text-red-500 
      hover:text-red-600 
      hover:bg-red-50 
      rounded-md 
      transition-colors
      ml-2
    `,
  
    footerArea: `
      mt-auto 
      pt-4 
      flex 
      items-center 
      justify-between
    `
  };

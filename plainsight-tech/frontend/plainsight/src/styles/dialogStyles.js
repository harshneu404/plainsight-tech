

// styles/dialogStyles.js
export const dialogStyles = {
   overlay: `
       fixed 
       inset-0 
       bg-black/50 
       backdrop-blur-sm 
       flex 
       items-center 
       justify-center 
       z-50
   `,

   container: `
       bg-white 
       rounded-xl 
       shadow-xl 
       p-6 
       w-full 
       max-w-md 
       mx-4
   `,

   title: `
       text-xl 
       font-semibold 
       text-gray-800 
       mb-4
   `,

   label: `
       block 
       text-sm 
       font-medium 
       text-gray-700 
       mb-1
   `,

   input: `
       w-full 
       px-3 
       py-2 
       bg-white 
       border 
       border-gray-300 
       rounded-lg 
       focus:outline-none 
       focus:ring-2 
       focus:ring-blue-500 
       focus:border-blue-500
   `,

   buttons: {
       container: `
           flex 
           justify-end 
           space-x-3 
           pt-4
       `,
       cancel: `
           px-4 
           py-2 
           text-sm 
           font-medium 
           text-gray-700 
           bg-white 
           border 
           border-gray-300 
           rounded-lg 
           hover:bg-gray-50 
           transition-colors
       `,
       submit: `
           px-4 
           py-2 
           text-sm 
           font-medium 
           text-white 
           bg-blue-500 
           rounded-lg 
           hover:bg-blue-600 
           transition-colors
       `
   }
};

// styles/globalStyles.js
export const commonStyles = {
    input: `
        w-full
        px-4
        py-2
        bg-white
        border
        border-gray-200
        rounded-lg
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-transparent
        transition-all
        duration-200
    `,

    button: {
        primary: `
            px-4
            py-2
            bg-blue-500
            text-white
            rounded-lg
            hover:bg-blue-600
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            transition-all
            duration-200
        `,
        secondary: `
            px-4
            py-2
            bg-white
            text-gray-700
            border
            border-gray-200
            rounded-lg
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-gray-500
            focus:ring-offset-2
            transition-all
            duration-200
        `,
        danger: `
            px-4
            py-2
            text-red-600
            hover:bg-red-50
            rounded-lg
            focus:outline-none
            transition-all
            duration-200
        `
    },

    card: `
        bg-white
        rounded-lg
        border
        border-gray-200
        hover:shadow-md
        transition-all
        duration-200
    `,

    container: `
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
    `
};

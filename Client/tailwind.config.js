/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './*.js',
  ],
  theme: {
    screens: {
      'phone': '450px',
      'tablet': '768px',
      'laptop': '1024px',
      'monitor' : '1280px',
    },
    
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#000000',
        blue : '#30A2FF',
        lightBlue : '#00C4FF',
        grey : '#373333',
        lightGrey : '#959393',
        // red : '#BD0707',
        lightRed : "#B60A0A"
      },

      spacing: {
        '1': '6px',
        '2': '8px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '46px',
        '7' : '40px',
        '8' : '44px',
        '9' : '48px',
        '10' : '52px',
        '11' : '56px',
        '12' : '60px',
        '13' : '64px',
        '14' : '68px',
        '15' : '72px',
        '16' : '76px',
        '17' : '80px',
      } ,

        fontsize: {
          '1': '8px',
          '2': '12px',
          '3': '16px',
          '4': '24px',
          '5': '32px',
          '6': '46px',
          '7' : '40px',
          '8' : '44px',
          '9' : '48px',
          '10' : '52px',
          '11' : '56px',
          '12' : '60px',
          '13' : '64px',
          '14' : '68px',
          '15' : '72px',
          '16' : '76px',
          '17' : '80px',
        }
    },
  },
  plugins: [],
}


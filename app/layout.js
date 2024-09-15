import { Inter } from 'next/font/google'
import '@/styles/global.css'
import Nav from '@/components/Nav';
import Provider from '@/components/provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app mx-5'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
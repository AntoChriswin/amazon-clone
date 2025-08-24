import React from 'react'
import './Home.css';
import './Login.css';
import Product from './Product';
function Home() {
  return (
    <div className='home'>
            <div className='home_container'>
                <img className='home_image' src='https://images-eu.ssl-images-amazon.com/images/G/31/LEO/AugART25/KV_PC2xnew._CB805026224_.jpg' alt=''></img>


            <div className='home_row'>
                <Product
                id="12321341"
                title="Wrishay Wall Stickers DIY Vinyl Marble Wallpaper Peel and Stick Waterproof Wallpaper for Home Kitchen Countertop Cabinet Oil Proof Kitchen"
                price={129}
                rating={4}
                image="https://m.media-amazon.com/images/I/61JRR4vg9mL._SL1024_.jpg"
                />
                <Product
                id="49538094"
                title="Anna Creations Self Adhesive Waterproof & Oil Proof Marble Texture Wallpaper PVC Vinyl Wall Stickers Papers "
                price={239.0}
                rating={4}
                image="https://m.media-amazon.com/images/I/81hMIgas4XL._SL1500_.jpg"
                />
                <Product
                id="49538077"
                title="Barebeauty 60CM X 200CM Kitchen Wallpaper Oil Proof and Heat Resistant Aluminium Backsplash Wallpaper"
                price={400.0}
                rating={4}
                image="https://m.media-amazon.com/images/I/41TYUakK0tL._SX300_SY300_QL70_FMwebp_.jpg"
                />
                
            </div>

            <div className='home_row'>
                <Product
                id="4903850"
                title="JBL C50HI, Wired in Ear Headphones with Mic, One Button Multi-Function Remote, Lightweight & Comfortable fit (Black)"
                price={500}
                rating={4}
                image="https://m.media-amazon.com/images/I/21eLORtanGL._SX300_SY300_QL70_FMwebp_.jpg"
                />
                <Product
                id="23445930"
                title="Ant Esports KM1610 LED Keyboard and Mouse Combo,"
                price={699}
                rating={5}
                image="https://m.media-amazon.com/images/I/41nv4lCdoTL._SX300_SY300_QL70_FMwebp_.jpg"
                />
                <Product
                id="3254354345"
                title="Ant Esports H520W Lightweight Gaming Over Ear Wired Headphones with Mic| 3.5MM Jack |50 MM Drivers"
                price={689}
                rating={4}
                image="https://m.media-amazon.com/images/I/71BC1mi6uDL._SL1500_.jpg"
                />
            </div>

            <div className='home_row'>
                <Product
                id="4903851"
                title="Ant PC Gaming Pc Argentine AL14400 Core i5 14400 |B760 Chipset WiFi + Bluetooth|16GB DDR5 5200Mhz | RTX 3050 8GB |1TB M.2 Nvme SSD|120MM Fan CPU Cooler|Mid Tower RGB Cabinet |Windows 11 Home Trial"
                price={82095}
                rating={3}
                image="https://m.media-amazon.com/images/I/61668k-1VzL._SL1200_.jpg"
                />
                <Product
                id="23445931"
                title="CHIST Gaming Desktop PC, Ryzen 5 5500, 32GB DDR4, 1TB NVMe SSD, RTX 3050 6GB, Liquid Cooling with RGB Fans Wi-FI Bluetooth,Windows 11 pro."
                price={56000}
                rating={4}
                image="https://m.media-amazon.com/images/I/61Cth40a4dL._SL1308_.jpg"
                />

            </div>

             <div className='home_row'>
                <Product
                id="90829332"
                title="Samsung 49 (124 cm) Odyssey G9 Curved Gaming Monitor|Dual QHD 5120 x 1440|144Hz|1ms|VESA DisplayHDR 600|FreeSync Premium Pro|HDR10+ Gaming|PBP|PIP|HAS|LS49FG910EWXXL|Black"
                price={93899}
                rating={5}
                image="https://m.media-amazon.com/images/I/61bromOifBL._SL1500_.jpg"
                />
            </div>
        </div>
    </div>
  )
}

export default Home
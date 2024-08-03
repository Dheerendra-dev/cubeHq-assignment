import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PhotoGrid: React.FC = () => {
    const [images, setImages] = useState<string[]>(Array(9).fill(''));

    useEffect(() => {
        const fetchRandomImages = async () => {
            try {
                const newImages = Array(9).fill('').map(() => `https://picsum.photos/200?random=${uuidv4()}`);
                setImages(newImages);
            } catch (error) {
                console.error('Error generating random image URLs:', error);
            } finally {
            }
        };
        fetchRandomImages();
        const interval = setInterval(fetchRandomImages, 10_000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='w-full flex justify-center items-center'>
            <div className="grid grid-cols-3 gap-2  mt-10 h-[550px] w-[800px]">
                {images?.map((image, index) => (
                    <div key={index} className="grid-item flex justify-center items-center">
                        {image ? <img src={image} alt={`Random ${index}`} className="rounded shadow-md w-full h-full object-cover" /> : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGrid;

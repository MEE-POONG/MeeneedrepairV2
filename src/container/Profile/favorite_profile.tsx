import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {LuHeart} from "react-icons/lu";

// Define the type of a product item
type ProductItem = {
    id: string;
    productname: string;
    prodcuting: string;
    productprice: string;
    // Add other properties as needed
};
const FavoriteProfile: React.FC = (props) => {


    const router = useRouter();
    const { id } = router.query; // ดึงค่า id จาก query parameters

    const [userData, setUserData] = useState({ FavoriteItems: [] });
    const [productData, setProductData] = useState<ProductItem[]>([]);
    // Fetch user data
    useEffect(() => {
        // Make the API request to fetch user data
        // Replace 'your-api-url' with the actual API endpoint for user data
        fetch(`/api/user/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
                // console.log(data);
            });
    }, [id]);

    // Fetch product data for each item in FavoriteItems
    useEffect(() => {
        const fetchProductData = async () => {
            const productItems = userData.FavoriteItems || [];

            const promises = productItems.map((item) => {
                // Make the API request to fetch product data
                // Replace 'your-api-url' with the actual API endpoint for product data
                return fetch(`/api/products/${item}`).then((response) => response.json());
            });

            const productData = await Promise.all(promises);
            setProductData(productData);
        };

        fetchProductData();
    }, [userData]);

    const deleteProductFromFavorites = (productId: string) => {
        // Send a DELETE request to the API endpoint to remove the product from the favorites list
        fetch(`/api/user/favorite/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ FavoriteItems : productId }),
        })
            .then((response) => {
                if (response.status === 200) {
                    // Product was successfully removed
                    // Update your UI to reflect the change
                    setProductData((prevData) => prevData.filter((product) => product.id !== productId));
                } else {
                    // Handle error if the removal was not successful
                    console.error('Failed to remove product from favorites');
                }
            })
            .catch((error) => {
                console.error('Error while removing product from favorites:', error);
            });
    };


    return (
        <div className="">
            <div className="flex items-center">
            <LuHeart className='w-[25px] h-[25px]' />
                <h3 className="text-2xl text-black ml-2">รายการโปรด</h3>
            </div>

            <div className=" rounded-lg md:p-8 text-secondary1 text-sm md:text-base">

                {productData.map((product, index) => (
                    <div
                        key={index}
                        className="bg-secondary2 rounded-2xl p-3 grid grid-cols-12 mb-5"
                    >
                        <img
                            // src={product.image} // Replace with the actual image property
                            // alt={product.name} // Replace with the actual name property
                            src='https://upload.wikimedia.org/wikipedia/commons/5/50/EquipoConXP.JPG'
                            className="col-span-2 md:col-span-2 h-24 w-24 object-contain"
                        />
                        <p className="col-span-4 md:col-span-6 self-center truncate">
                            {product.productname} {/* Replace with the actual name property */}
                        </p>
                        <p className="col-span-2 md:col-span-1 self-center text-[#FF5C74]">
                            {`฿ ${product.productprice}`} {/* Replace with the actual price property */}
                        </p>
                        <button className="col-span-3 md:col-span-2 bg-[#FFCD4B] rounded-xl h-14 md:h-10 self-center ml-2">
                            หยิบใส่ตระกร้า
                        </button>

                        <button
                            onClick={() => deleteProductFromFavorites(product.id)} // Pass the product ID to deleteProductFromFavorites

                            className="flex items-center justify-center">

                            <svg className="self-center" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32">
                                <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
                            </svg>

                        </button>
                    </div>
                ))}


            </div>

        </div>
    )
}
export default FavoriteProfile;
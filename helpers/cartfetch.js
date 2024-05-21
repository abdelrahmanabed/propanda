

    // Fetch favorite courses from internal storage or API
export const fetchCartCourses = async () => {
        try {
            // Assuming you have stored fav courses IDs in localStorage or fetched from an API
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
           return cartItems
        } catch (error) {
            console.error('Error fetching favorite courses:', error);
        }
    };


import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckOutButton from "@/components/CheckOutButton";
import MenuItems from "@/components/MenuItems";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserprofileForm";
import { MenuItem } from "@/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};
const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const {createCheckoutSession , isLoading:isCheckoutLoading} = useCreateCheckoutSession()
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // [{
  //   _id : Item1,
  //   name : chesse pizaa,
  //   price : 10,
  //   quantity : 1
  // },{
  //   _id : Ite,
  //   name :  pizaa,
  //   price : 10,
  //   quantity : 2
  // }
  // ]
  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevItem) => {
      //1. check if item is already in cart
      const exisitingItem = prevItem.find(
        (cartItem) => cartItem._id === menuItem._id
      );
      //2. if item is in cart , update the quatity
      let updatedCartItem;
      if (exisitingItem) {
        updatedCartItem = prevItem.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      //3. if item is not in cart , add it as new item
      else {
        updatedCartItem = [
          ...prevItem,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItem)
      );
      return updatedCartItem;
    });
  };
  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevItem) => {
      const updatedCartItem = prevItem.filter(
        (item) => cartItem._id !== item._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItem)
      );
      return updatedCartItem;
    });
  };

const onCheckout = async (userFormData : UserFormData)=> {
  if(!restaurant){
    return;
  }
  console.log("userformData", userFormData);
  const checkoutData = {
    cartItems:cartItems.map((cartItem)=>({
      menuItemId:cartItem._id,
      name:cartItem.name,
      quantity:cartItem.quantity.toString(),
    })),
    restaurantId: restaurant._id,
    deliveryDetails:{
      name:userFormData.name,
      addressLine1:userFormData.addressLine1,
      city:userFormData.city,
      country:userFormData.country,
      email:userFormData.email as string
    }
  }
  const data = await createCheckoutSession(checkoutData)
  window.location.href = data.url
}

  if (isLoading || !restaurant) {
    return (
      <span className="flex">
        {" "}
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading....
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-10 ">
      <AspectRatio ratio={16 / 5}>
        <img
          className="rounded-md object-cover h-full w-full"
          src={restaurant.imageUrl}
          alt=""
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-5">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl text-slate-700 font-bold tracking-tight">
            Menu
          </span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItems
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckOutButton disabled={cartItems.length === 0} onCheckout={onCheckout} isLoading={isCheckoutLoading}/>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

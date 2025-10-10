import React from "react";
import { Card } from "../../components/admin/Card/Card";
import { Separator } from "../../components/admin/Separator/Separator";
import { Badge } from "../../components/admin/Badge/Badge";
import {
  fetchRemoveFromCart,
  removeFromGuestCart,
} from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ImageWithFallback from "../../components/common/ImageWithFallback/ImageWithFallback";
import { X } from "lucide-react";

export function OrderSummary() {
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Calculate totals based on cartItems
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.price || 0;
    const discount = item.discount || 0;
    const discountedPrice = price - (price * discount) / 100;
    return sum + discountedPrice;
  }, 0);

  const totalDiscount = cartItems.reduce((sum, item) => {
    const price = item.price || 0;
    const discount = item.discount || 0;
    return sum + (price * discount) / 100;
  }, 0);

  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const removeFromCart = (itemId) => {
    if (isLoggedIn) {
      dispatch(fetchRemoveFromCart(itemId));
    } else {
      dispatch(removeFromGuestCart(itemId));
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Card className="p-6 lg:col-span-1">
        <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>
        <div className="space-y-4">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex gap-4 animate-pulse">
              <div className="w-24 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // Show empty state if no items
  if (!cartItems || cartItems.length === 0) {
    return (
      <Card className="p-6 lg:col-span-1">
        <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 lg:col-span-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <Badge variant="outline" className="text-xs">
          {cartItems.length} {cartItems.length === 1 ? "course" : "courses"}
        </Badge>
      </div>

      <div className="space-y-4 mb-6">
        {cartItems.map((course) => {
          const discountedPrice =
            course.price - (course.price * (course.discount || 0)) / 100;
          return (
            <div
              key={course._id || course.id}
              className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                <ImageWithFallback
                  src={`${
                    import.meta.env.VITE_BACKEND_URL_IMG
                  }/courses/covers/${course.cover}`}
                  alt={course.name || course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="truncate font-medium text-sm mb-1">
                  {course.name || course.title}
                </h4>
                <p className="text-muted-foreground truncate text-xs mb-2">
                  {course.creator?.name || course.instructor || "SabzLearn"}
                </p>
                {course.discount > 0 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    {course.discount}% OFF
                  </Badge>
                )}
              </div>
              <div className="flex flex-col items-end gap-1 justify-between">
                <button
                  onClick={() => removeFromCart(course._id || course.id)}
                  className="text-muted-foreground hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20"
                  aria-label="Remove course"
                  title="Remove from cart"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="text-right">
                  <p className="font-semibold text-sm">
                    ${discountedPrice.toFixed(2)}
                  </p>
                  {course.discount > 0 && (
                    <p className="text-muted-foreground line-through text-xs">
                      ${course.price?.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Separator className="my-6" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Subtotal ({cartItems.length} courses)
          </p>
          <p className="font-medium">${subtotal.toFixed(2)}</p>
        </div>

        {totalDiscount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <p className="flex items-center gap-1">
              <span>Discount</span>
              <Badge
                variant="secondary"
                className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              >
                SAVE
              </Badge>
            </p>
            <p className="font-medium">-${totalDiscount.toFixed(2)}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Tax (10%)</p>
          <p className="font-medium">${tax.toFixed(2)}</p>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center text-base">
          <h3 className="font-semibold">Total</h3>
          <div className="text-right">
            <h3 className="font-semibold text-lg">${total.toFixed(2)}</h3>
            <p className="text-xs text-muted-foreground">USD</p>
          </div>
        </div>
      </div>

      {totalDiscount > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Badge className="bg-green-600 hover:bg-green-600 text-white px-3 py-1">
                💰 SAVE ${totalDiscount.toFixed(2)}
              </Badge>
            </div>
            <div className="flex-1">
              <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                Great choice! You're saving money on this order.
              </p>
              <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                {Math.round((totalDiscount / (subtotal + totalDiscount)) * 100)}
                % discount applied
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

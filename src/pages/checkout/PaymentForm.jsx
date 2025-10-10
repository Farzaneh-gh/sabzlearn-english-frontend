import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/admin/Card/Card";
import {Label} from "../../components/admin/Label/Label";
import {Input} from "../../components/admin/Input/Input";
import {Button} from "../../components/admin/Button/Button";
import { Separator } from '../../components/admin/Separator/Separator';
import { CreditCard, Lock } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/admin/Tabs/Tabs";

const PaymentForm = () => {
  return (
    <Card className="relative overflow-hidden lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-md font-medium">Checkout</CardTitle>
        <CardDescription className="my-4">
          Complete your purchase by providing your payment details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div>
            <Label htmlFor="cardNumber" className="text-sm font-medium">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="m-2"
            />
            <span className="text-gray-500 text-sm ">
              Order confirmation will be sent to this email
            </span>
          </div>
          <Separator className="my-4" />

          <div>
            <span>Payment Method</span>
            <Tabs defaultValue="creditCard" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="creditCard"
                  className="flex items-center justify-center gap-2"
                >
                  <CreditCard size={16} />
                  Credit Card / Debit Card
                </TabsTrigger>
                <TabsTrigger
                  value="paypal"
                  className="flex items-center justify-center gap-2"
                >
                  PayPal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="creditCard" className="mt-4">
                <div>
                  <Label
                    htmlFor="cardNumber"
                    className="text-sm font-medium ml-3"
                  >
                    Card Number
                  </Label>
                  <Input
                    type="text"
                    id="cardNumber"
                    placeholder="Enter your card number"
                    className="m-2"
                  />
                  <div className="flex items-center justify-between gap-2 my-10 w-full">
                    <div className="w-1/2">
                      <Label
                        htmlFor="Expiration"
                        className="text-sm font-medium  ml-2"
                      >
                        Expiry Date
                      </Label>
                      <Input
                        type="text"
                        id="Expiration"
                        placeholder="MM/YY"
                        className="m-2"
                      />
                    </div>
                    <div className="w-1/2">
                      <Label
                        htmlFor="CVV"
                        className="text-sm font-medium  ml-2"
                      >
                        CVV
                      </Label>
                      <Input
                        type="text"
                        id="CVV"
                        placeholder="Enter your CVV"
                        className="m-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        placeholder="United States"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        placeholder="10001"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="paypal">
                <div className="my-6 p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm">
                    You will be redirected to PayPal to complete your purchase.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-blue-900 dark:text-blue-200 text-sm">
              Your payment information is secure and encrypted. We never store
              your card details.
            </p>
          </div>
          <Button type="submit" className="w-full" size="lg">
            Complete Purchase
          </Button>
          <p className="text-muted-foreground text-center mt-4 text-sm">
            By completing your purchase, you agree to our Terms of Service
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default PaymentForm
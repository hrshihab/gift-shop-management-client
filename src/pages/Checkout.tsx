/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import GForm from "../components/form/GForm";
import GInput from "../components/form/GInput";
import { Table } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { calculateTotalAmount } from "../utils/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../Schemas/checkout.schema";
import { logout, useCurrentToken } from "../redux/feature/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { TUser } from "../types";
import { useCreateInvoiceMutation } from "../redux/feature/Invoice/invoice.api";
import { toast } from "sonner";
import { clearCart } from "../redux/feature/cart/cartSlice";
import { Link } from "react-router-dom";

const Checkout = () => {
    const dispatch = useAppDispatch();

    const token = useAppSelector(useCurrentToken);
    const cartItems = useAppSelector((state) => state.cart.cartItems);

    const [createInvoice] = useCreateInvoiceMutation();

    const user = verifyToken(token as string) || {};

    if (!user) {
        dispatch(logout());
    }

    const tableData = cartItems.map((item, index) => {
        return {
            key: index + 1,
            productId: item.productId,
            name: item.productName,
            price: item.price,
            quantity: item.quantity,
        };
    });

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Product ID",
            dataIndex: "productId",
            key: "productId",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (_text: any, record: { price: number }) => {
                return <span>&#2547; {record.price}</span>;
            },
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (
                _text: any,
                record: { price: number; quantity: number },
            ) => {
                return <span>&#2547; {record.price * record.quantity}</span>;
            },
        },
    ];

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (cartItems.length === 0) return;

        const toastId = toast.loading("Selling Products...");

        const invoiceData = {
            totalAmount: calculateTotalAmount(cartItems),

            buyerName: data.buyerName,
            products: cartItems.map((item) => {
                return {
                    productId: item.productId,
                    productName: item.productName,
                    price: item.price,
                    quantity: item.quantity,
                };
            }),
            sellDate: new Date().toISOString().split("T")[0],
            sellerId: (user as TUser)?.id.toString(),
        };
        console.log(invoiceData);

        try {
            const res = await createInvoice(invoiceData).unwrap();
            // console.log(res);

            if (res.success) {
                toast.success("Products Sold Successfully", { id: toastId });
                dispatch(clearCart());
            } else {
                toast.error("Failed to sell products", { id: toastId });
            }
        } catch (error) {
            toast.error("Failed to sell products", { id: toastId });
        }
    };

    return (
        <div>
            <div className="bg-[--primary-color] px-7 py-10">
                <GForm
                    onSubmit={onSubmit}
                    disableReset={true}
                    resolver={zodResolver(checkoutSchema)}
                >
                    <div className="bg-gray-100 p-3 rounded">
                        <GInput
                            type="text"
                            name="buyerName"
                            label="Buyer Name"
                            placeholder="Enter Buyer Name"
                        />
                    </div>
                    <div className="my-5 bg-gray-100 p-3 rounded">
                        <div>
                            <Table
                                columns={columns}
                                dataSource={tableData}
                                scroll={{ x: 500 }}
                                pagination={false}
                            />
                        </div>
                        <div className="flex flex-col items-end gap-y-6 my-10">
                            <div className="text-[14px] w-full  md:w-[250px]">
                                <div className="flex justify-between">
                                    <span className="font-bold">
                                        Total Quantity
                                    </span>
                                    <span>
                                        {cartItems.reduce(
                                            (acc, item) => acc + item.quantity,
                                            0,
                                        )}
                                    </span>
                                </div>

                                <hr className="my-2 border-[1px]" />
                                <div className="flex justify-between">
                                    <span className="font-bold">Subtotal</span>
                                    <span>
                                        &#2547; {}
                                        {calculateTotalAmount(cartItems)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-end gap-2">
                        <Link to={`/${(user as TUser).role}/dashboard`}>
                            <button className="button-primary w-full !px-10">
                                Go to Dashboard
                            </button>
                        </Link>
                        <Link to={`/${(user as TUser).role}/gift-list`}>
                            <button className="button-primary w-full !px-10">
                                Go to Products
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className={`${cartItems.length === 0 ? "button-disabled" : "button-primary"} !px-10`}
                            disabled={cartItems.length === 0 ? true : false}
                        >
                            Checkout
                        </button>
                    </div>
                </GForm>
            </div>
        </div>
    );
};

export default Checkout;

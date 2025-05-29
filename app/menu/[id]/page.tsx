"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import type { Product } from "@/types/Product";
import { allProducts } from "@/data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (params.id) {
      const foundProduct = allProducts.find((p) => p.id === params.id);
      setProduct(foundProduct || null);
    }
  }, [params.id]);

  // const handleQuantityChange = (change: number) => {
  //   setQuantity((prev) => Math.max(1, prev + change));
  // };
  //
  // const handleAddToCart = () => {
  //   if (product) {
  //     // Add to cart logic here
  //     console.log(`Added ${quantity} x ${product.name} to cart`);
  //   }
  // };

  // const handleSubmitReview = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Submit review logic here
  //   console.log({ name: reviewName, review: reviewText, rating });
  //   setReviewName("");
  //   setReviewText("");
  //   setRating(5);
  // };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#DC143C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
      {/* <div className="relative h-64 bg-gradient-to-r from-green-800 to-green-600 overflow-hidden"> */}
      {/*   <div className="absolute inset-0 bg-black/40"></div> */}
      {/*   <Image */}
      {/*     src="/placeholder.svg?height=300&width=1200" */}
      {/*     alt="Fresh ingredients background" */}
      {/*     fill */}
      {/*     className="object-cover" */}
      {/*     priority */}
      {/*   /> */}
      {/*   <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center"> */}
      {/*     <nav className="text-white mb-4"> */}
      {/*       <Link href="/" className="hover:text-[#DC143C] transition-colors"> */}
      {/*         Home */}
      {/*       </Link> */}
      {/*       <span className="mx-2">•</span> */}
      {/*       <span className="text-[#DC143C]">Shop details</span> */}
      {/*     </nav> */}
      {/*   </div> */}
      {/* </div> */}

      <div className="container mx-auto px-6 py-8">
        {/* Go Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="mb-8 bg-[#DC143C] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaArrowLeft />
          Go Back
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
              )}
              <Image
                src={product.image || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                fill
                className={`object-cover transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                priority
              />

              {/* Floating Discount Badge */}
              {/* <div className="absolute top-4 left-4 bg-[#DC143C] text-white px-3 py-1 rounded-full text-sm font-bold"> */}
              {/*   Fresh */}
              {/* </div> */}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description ||
                  "A delicious menu item crafted with the finest ingredients and prepared with care by our expert chefs. Experience the perfect blend of flavors that will satisfy your taste buds."}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 line-through text-xl">
                ${(product.price * 1.5).toFixed(2)}
              </span>
              <span className="text-3xl font-bold text-[#DC143C]">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="bg-[#DC143C] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            {/* Rating */}
            {/* <div className="flex items-center gap-4"> */}
            {/*   <div className="flex items-center gap-1"> */}
            {/*     {[...Array(5)].map((_, i) => ( */}
            {/*       <FaStar key={i} className="text-yellow-400 text-lg" /> */}
            {/*     ))} */}
            {/*   </div> */}
            {/*   <span className="text-gray-600">5.0 Rating</span> */}
            {/*   <span className="text-gray-400">|</span> */}
            {/*   <span className="text-gray-600">22 Reviews</span> */}
            {/* </div> */}

            {/* Quantity and Add to Cart */}
            {/* <div className="flex items-center gap-4"> */}
            {/*   <div className="flex items-center border border-gray-300 rounded-lg"> */}
            {/*     <button */}
            {/*       onClick={() => handleQuantityChange(-1)} */}
            {/*       className="p-3 hover:bg-gray-100 transition-colors" */}
            {/*       disabled={quantity <= 1} */}
            {/*     > */}
            {/*       <FaMinus className="text-sm" /> */}
            {/*     </button> */}
            {/*     <span className="px-4 py-3 font-semibold min-w-[60px] text-center"> */}
            {/*       {quantity} */}
            {/*     </span> */}
            {/*     <button */}
            {/*       onClick={() => handleQuantityChange(1)} */}
            {/*       className="p-3 hover:bg-gray-100 transition-colors" */}
            {/*     > */}
            {/*       <FaPlus className="text-sm" /> */}
            {/*     </button> */}
            {/*   </div> */}
            {/**/}
            {/*   <motion.button */}
            {/*     onClick={handleAddToCart} */}
            {/*     className="flex-1 bg-[#DC143C] text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2" */}
            {/*     whileHover={{ scale: 1.02 }} */}
            {/*     whileTap={{ scale: 0.98 }} */}
            {/*   > */}
            {/*     <FaShoppingCart /> */}
            {/*     Add to Cart */}
            {/*   </motion.button> */}
            {/* </div> */}

            {/* Wishlist and Compare */}
            {/* <div className="flex items-center gap-6"> */}
            {/*   <button */}
            {/*     onClick={() => setIsWishlisted(!isWishlisted)} */}
            {/*     className={`flex items-center gap-2 transition-colors ${ */}
            {/*       isWishlisted */}
            {/*         ? "text-[#DC143C]" */}
            {/*         : "text-gray-600 hover:text-[#DC143C]" */}
            {/*     }`} */}
            {/*   > */}
            {/*     <FaHeart className={isWishlisted ? "fill-current" : ""} /> */}
            {/*     Add to Wishlist */}
            {/*   </button> */}
            {/*   <button className="flex items-center gap-2 text-gray-600 hover:text-[#DC143C] transition-colors"> */}
            {/*     <FaBalanceScale /> */}
            {/*     Compare */}
            {/*   </button> */}
            {/* </div> */}

            {/* Product Info */}
            <div className="border-t pt-6 space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Tag:</span> Our Shop
              </p>
            </div>

            {/* Social Share */}
            <div className="border-t pt-6">
              <p className="text-gray-600 mb-3 font-semibold">Share:</p>
              <div className="flex items-center gap-3">
                {[
                  { icon: FaFacebookF, color: "hover:text-blue-600" },
                  { icon: FaTwitter, color: "hover:text-blue-400" },
                  { icon: FaInstagram, color: "hover:text-pink-600" },
                  { icon: FaWhatsapp, color: "hover:text-green-600" },
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors ${social.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Leave a Review Section */}
        {/* <motion.div */}
        {/*   className="mt-16 bg-white rounded-2xl p-8 shadow-lg" */}
        {/*   initial={{ opacity: 0, y: 50 }} */}
        {/*   animate={{ opacity: 1, y: 0 }} */}
        {/*   transition={{ duration: 0.6, delay: 0.4 }} */}
        {/* > */}
        {/*   <h3 className="text-2xl font-bold text-gray-900 mb-6"> */}
        {/*     Leave a Review */}
        {/*   </h3> */}
        {/**/}
        {/*   <form onSubmit={handleSubmitReview} className="space-y-6"> */}
        {/*     <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        {/*       <div> */}
        {/*         <label className="block text-gray-700 font-semibold mb-2"> */}
        {/*           Your Name */}
        {/*         </label> */}
        {/*         <input */}
        {/*           type="text" */}
        {/*           value={reviewName} */}
        {/*           onChange={(e) => setReviewName(e.target.value)} */}
        {/*           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all" */}
        {/*           placeholder="Enter your name" */}
        {/*           required */}
        {/*         /> */}
        {/*       </div> */}
        {/**/}
        {/*       <div> */}
        {/*         <label className="block text-gray-700 font-semibold mb-2"> */}
        {/*           Rating */}
        {/*         </label> */}
        {/*         <div className="flex items-center gap-2"> */}
        {/*           {[1, 2, 3, 4, 5].map((star) => ( */}
        {/*             <button */}
        {/*               key={star} */}
        {/*               type="button" */}
        {/*               onClick={() => setRating(star)} */}
        {/*               className={`text-2xl transition-colors ${star <= rating ? "text-yellow-400" : "text-gray-300"}`} */}
        {/*             > */}
        {/*               <FaStar /> */}
        {/*             </button> */}
        {/*           ))} */}
        {/*         </div> */}
        {/*       </div> */}
        {/*     </div> */}
        {/**/}
        {/*     <div> */}
        {/*       <label className="block text-gray-700 font-semibold mb-2"> */}
        {/*         Your Review */}
        {/*       </label> */}
        {/*       <textarea */}
        {/*         value={reviewText} */}
        {/*         onChange={(e) => setReviewText(e.target.value)} */}
        {/*         rows={5} */}
        {/*         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent transition-all resize-none" */}
        {/*         placeholder="Write your review here..." */}
        {/*         required */}
        {/*       /> */}
        {/*     </div> */}
        {/**/}
        {/*     <motion.button */}
        {/*       type="submit" */}
        {/*       className="bg-[#DC143C] text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold" */}
        {/*       whileHover={{ scale: 1.02 }} */}
        {/*       whileTap={{ scale: 0.98 }} */}
        {/*     > */}
        {/*       Submit Review */}
        {/*     </motion.button> */}
        {/*   </form> */}
        {/* </motion.div> */}
      </div>
    </div>
  );
}

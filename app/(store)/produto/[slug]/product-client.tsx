'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ShoppingCart, Check, Star, ChevronLeft, Minus, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/cart-context';
import { mockProducts } from '@/lib/mocks/storefront';
import { formatPrice } from '@/lib/utils/formatters';
import { toast } from '@/hooks/use-toast';

export function ProductPageClient() {
  const params = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Busca produto pelo slug
  const product = mockProducts.find((p) => p.slug === params.slug);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-foreground">Produto não encontrado</h1>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
          Voltar para a loja
        </Link>
      </div>
    );
  }
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: 'Adicionado ao carrinho!',
      description: `${quantity}x ${product.name}`,
    });
  };
  
  // Produtos relacionados (mesma categoria)
  const relatedProducts = mockProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Início</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discount > 0 && (
              <Badge variant="destructive" className="absolute top-4 left-4 text-sm">
                -{discount}%
              </Badge>
            )}
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-border'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Info */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {product.isNew && <Badge variant="secondary">Novo</Badge>}
            {product.isBestseller && <Badge variant="secondary" className="bg-green-100 text-green-800">Mais Vendido</Badge>}
            {product.stock <= 5 && product.stock > 0 && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Apenas {product.stock} unidades</Badge>
            )}
          </div>
          
          {/* Title */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
          </div>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-foreground font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} avaliações)</span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Stock */}
          <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? (
              <>
                <Check className="w-4 h-4 inline mr-1" />
                Em estoque
              </>
            ) : (
              'Esgotado'
            )}
          </p>
          
          {/* Quantity & Add to Cart */}
          {product.stock > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-muted transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
              
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          )}
          
          {/* Features */}
          <Separator />
          <div>
            <h3 className="font-semibold mb-3">Características</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* SKU */}
          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="descricao">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="descricao">Descrição</TabsTrigger>
            <TabsTrigger value="especificacoes">Especificações</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="descricao" className="mt-6">
            <p className="text-foreground leading-relaxed">{product.description}</p>
          </TabsContent>
          
          <TabsContent value="especificacoes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Categoria</span>
                <p className="font-medium">{product.category}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">SKU</span>
                <p className="font-medium">{product.sku}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Tags</span>
                <p className="font-medium">{product.tags.join(', ')}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="avaliacoes" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Avaliações em breve</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link key={product.id} href={`/produto/${product.slug}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-primary font-bold mt-2">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

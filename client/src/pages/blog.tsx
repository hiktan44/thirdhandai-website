import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import type { BlogPost } from "../../../shared/schema";

export default function BlogPage() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts?published=true"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          {t('blog.title')}
        </h1>

        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={currentLang === 'tr' ? post.titleTr : post.titleEn}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardHeader>
                  <CardTitle>
                    {currentLang === 'tr' ? post.titleTr : post.titleEn}
                  </CardTitle>
                  {post.category && (
                    <span className="text-sm text-blue-600 font-medium">
                      {post.category}
                    </span>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {currentLang === 'tr' ? post.excerptTr : post.excerptEn}
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" className="w-full">
                      {t('blog.readMore')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && posts?.length === 0 && (
          <div className="text-center text-white">
            <p>Henüz blog yazısı bulunmamaktadır.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

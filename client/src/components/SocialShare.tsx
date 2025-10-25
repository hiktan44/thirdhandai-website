import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const { toast } = useToast();
  const fullUrl = `${window.location.origin}${url}`;

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      '_blank'
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      '_blank'
    );
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
      description || ''
    )}%0A%0A${encodeURIComponent(fullUrl)}`;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast({
        title: 'Link kopyalandı!',
        description: 'Blog yazısının linki panoya kopyalandı.',
      });
    } catch (err) {
      toast({
        title: 'Hata',
        description: 'Link kopyalanırken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={shareOnFacebook}>
        <Facebook className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={shareOnTwitter}>
        <Twitter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={shareOnLinkedIn}>
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={shareViaEmail}>
        <Mail className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={copyLink}>
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

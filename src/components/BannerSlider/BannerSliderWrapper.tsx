
import BannerSlider from './BannerSlider';

interface BannerSliderWrapperProps {
  position: string;
  page: string;
  className?: string;
}

export async function BannerSliderWrapper({
  position,
  page,
  className,
}: BannerSliderWrapperProps) {
  try {

    return (
      <div className={className}>
        <BannerSlider banners={[]} />
      </div>
    );
  } catch (error) {
    console.error('Failed to load banners:', error);
    return <div>Error loading banners</div>;
  }
}

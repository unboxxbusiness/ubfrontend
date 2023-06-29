import * as prismic from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ConditionalWrap } from "@/components/ConditionalWrap";
import { PrismicRichText } from "@/components/PrismicRichText";

const ImageCard = ({ item }) => {
  const image = item.image;

  return (
    <li className="grid gap-8">
      {prismic.isFilled.image(image) && (
        <div className="bg-gray-100">
          <ConditionalWrap
            condition={prismic.isFilled.link(item.buttonLink)}
            wrap={({ children }) => (
              <PrismicNextLink field={item.buttonLink} tabIndex="-1">
                {children}
              </PrismicNextLink>
            )}
          >
            <PrismicNextImage field={image} sizes="100vw" className="w-full shadow-lg rounded-lg" />
          </ConditionalWrap>
        </div>
      )}
      <div className="leading-relaxed">
        <PrismicRichText field={item.text} />
      </div>
      {prismic.isFilled.link(item.buttonLink) && (
        <div>
          <PrismicNextLink field={item.buttonLink} className="font-semibold">
            {item.buttonText || "More Info"}
          </PrismicNextLink>
        </div>
      )}
    </li>
  );
};

const ImageCards = ({ slice }) => {
  return (
    <Bounded as="section" className="bg-gray-100">
      <div className="grid gap-12">
        {prismic.isFilled.richText(slice.primary.heading) && (
          <Heading className="text-left underline decoration-sky-600 hover:decoration-blue-400">
            <PrismicText field={slice.primary.heading} />
          </Heading>
        )}
        <ul className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
          {slice.items.map((item) => (
            <ImageCard key={item.image.url} item={item} />
          ))}
        </ul>
      </div>
    </Bounded>
  );
};

export default ImageCards;

import '@/styles/itemPage.css';
import { createClientServer } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ toyline: string; itemName: string }>;
};

type Toylines = {
  name: string;
  brands: { name: string };
};

export const revalidate = 300;

export default async function ItemPage({ params }: Props) {
  const { toyline, itemName } = await params;
  const supabase = await createClientServer();

  const { data: figure, error } = await supabase
    .from('figures')
    .select('id, name, slug, toylines(name, slug, brands(name)), posts(rating)')
    .eq('slug', itemName)
    .eq('toylines.slug', toyline)
    .maybeSingle();

  if (!figure) return notFound();

  if (error) {
    return (
      <main className="item-page">
        <h3>Error fetching figure.</h3>
      </main>
    );
  }

  function calcAverage(ratings: { rating: number }[]) {
    if (!ratings) return 0;
    let sum = 0;
    let ratingsLength = ratings.length;
    for (let i = 0; i < ratingsLength; i++) {
      if (ratings[i].rating != null) {
        sum += ratings[i].rating;
      } else {
        ratingsLength = ratingsLength - 1;
      }
    }
    const average = sum / ratingsLength;

    return (
      <>
        <strong>{average.toFixed(1)}&nbsp;</strong>({ratingsLength} ratings)
      </>
    );
  }

  // FIX: Sanitize this better
  const toylines = figure.toylines as unknown as Toylines;

  return (
    <main className="item-page">
      <h1>{figure?.name}</h1>
      <h2>
        {toylines.brands.name}&nbsp;{toylines.name}
      </h2>
      <p>Average rating: {calcAverage(figure.posts)}</p>
    </main>
  );
}

export async function generateMetadata({ params }: Props) {
  const { toyline, itemName } = await params;
  const supabase = await createClientServer();
  const { data: figure, error } = await supabase
    .from('figures')
    .select('name, toylines(name, brands(name))')
    .eq('slug', itemName)
    .eq('toylines.slug', toyline)
    .maybeSingle();

  const toylines = figure?.toylines as unknown as Toylines;

  const title = `Toybox | ${toylines.brands.name} ${toylines.name} ${figure?.name}`;

  if (figure || !error) {
    return { title };
  } else return;
}

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

  function calcAverage(ratings: { rating: number }[]): number {
    if (!ratings) return 0;
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
      sum += ratings[i].rating;
    }
    const average = sum / ratings.length;
    return average;
  }

  // FIX: Sanitize this better
  const toylines = figure.toylines as unknown as Toylines;

  return (
    <main className="item-page">
      <h3>{figure?.name}</h3>
      <p>
        {toylines.brands.name}&nbsp;{toylines.name}
      </p>
      {calcAverage(figure?.posts) > 0 && (
        <p>
          Average rating: <strong>{calcAverage(figure?.posts).toFixed(1)}/10</strong>&nbsp;(
          {figure?.posts.length} ratings)
        </p>
      )}
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

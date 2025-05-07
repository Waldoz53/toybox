'use client';

import { useState, useEffect, useCallback } from 'react';
import { addItem } from '../actions';
import Toast from '@/components/Toast';
import { useRouter } from 'next/navigation';
import useLoading from '../context/LoadingContext';
import { createClientBrowser } from '@/utils/supabase/client';

type Brand = {
  id: string;
  name: string;
};

type Toyline = {
  id: string;
  name: string;
  brandId: string;
};

type Figure = {
  id: string;
  name: string;
  toylineId: string;
};

export default function PostPage() {
  const [message, setMessage] = useState('');
  const supabase = createClientBrowser();
  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [fetchedBrands, setFetchedBrands] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(false);
  const [toylines, setToylines] = useState<Toyline[] | null>(null);
  const [selectedLine, setSelectedLine] = useState(false);
  const [figures, setFigures] = useState<Figure[] | null>(null);
  const [selectedFigure, setSelectedFigure] = useState(false);
  const { setLoading } = useLoading();
  const router = useRouter();

  const fetchAllBrands = useCallback(async () => {
    if (!fetchedBrands) {
      setLoading(true);
      const { data, error } = await supabase.from('brands').select('*');
      if (data || !error) {
        setBrands(data);
        setFetchedBrands(true);
      } else {
        setMessage('Network error.');
      }
      setLoading(false);
    }
  }, [supabase, fetchedBrands, setLoading]);

  useEffect(() => {
    fetchAllBrands();
  }, [fetchAllBrands]);

  async function fetchAllToylines(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value !== '') {
      setSelectedBrand(true);
      setSelectedFigure(false);
      setSelectedLine(false);
    } else {
      setSelectedFigure(false);
      setSelectedLine(false);
      setSelectedBrand(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('toylines')
      .select('*')
      .eq('brand_id', e.target.value);
    if (data || !error) {
      setToylines(data);
    } else {
      setMessage('Network error.');
    }
    setLoading(false);
  }

  async function fetchToysFromLine(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value !== '') {
      setSelectedLine(true);
    } else {
      setSelectedLine(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('figures')
      .select('*')
      .eq('toyline_id', e.target.value);
    if (data || !error) {
      setFigures(data);
    } else {
      setMessage('Network error.');
    }
    setLoading(false);
  }

  async function enableDescriptionAndSubmit(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value !== '') {
      setSelectedFigure(true);
    } else {
      setSelectedFigure(false);
      return;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await addItem(formData).then((res) => {
      setMessage(res ?? '');
      if (res !== '') {
        console.log('Submit post error:', message);
      }
      setLoading(false);
    });

    setTimeout(() => {
      setMessage('');
    }, 3000);

    router.push('/profile');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="brands">Brand:</label>
      <select name="brands" id="brands" required onChange={(e) => fetchAllToylines(e)}>
        <option value="">Select a brand</option>
        {brands &&
          brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
      </select>

      {selectedBrand && (
        <>
          <label htmlFor="toyline">Line:</label>
          <select name="toylines" required onChange={(e) => fetchToysFromLine(e)}>
            <option value="">Select a line</option>
            {toylines &&
              toylines.map((toyline) => (
                <option key={toyline.id} value={toyline.id}>
                  {toyline.name}
                </option>
              ))}
          </select>
        </>
      )}

      {selectedLine && (
        <>
          <label htmlFor="figure">Figure Name:</label>
          <select name="figure" required onChange={(e) => enableDescriptionAndSubmit(e)}>
            <option value="">Select a figure</option>
            {figures &&
              figures.map((figure) => (
                <option key={figure.id} value={figure.id}>
                  {figure.name}
                </option>
              ))}
          </select>
        </>
      )}

      {selectedFigure && (
        <>
          <label htmlFor="description">Review:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Optional: write a review or describe its quality"
          />

          <div className="spacer"></div>
          <button>Add</button>
        </>
      )}

      <Toast message={message} />
    </form>
  );
}

'use client';

import { adminAddFigure } from '@/app/actions';
import useLoading from '@/app/context/LoadingContext';
import Toast from '@/components/Toast';
import { createClientBrowser } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type Brands = {
  id: string;
  name: string;
};

type Toylines = {
  id: string;
  name: string;
  brandId: string;
};

export default function AdminAddFigure() {
  const [message, setMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('error');
  const supabase = createClientBrowser();
  const [brands, setBrands] = useState<Brands[] | null>(null);
  const [fetchedBrands, setFetchedBrands] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(false);
  const [toylines, setToylines] = useState<Toylines[] | null>(null);
  const [selectedLine, setSelectedLine] = useState(false);
  const [name, setName] = useState('');
  const { setLoading } = useLoading();

  useEffect(() => {
    async function fetchAllBrands() {
      if (!fetchedBrands) {
        setLoading(true);
        const { data, error } = await supabase.from('brands').select('*');
        if (data || !error) {
          setBrands(data);
          setFetchedBrands(true);
        } else {
          setMessage('Network error');
        }
        setLoading(false);
      }
    }
    fetchAllBrands();
  }, [fetchedBrands, setLoading, supabase]);

  async function fetchAllToylines(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value !== '') {
      setSelectedBrand(true);
      setSelectedLine(false);
    } else {
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

  async function enableInputAndSubmit(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value !== '') {
      setSelectedLine(true);
    } else {
      setSelectedLine(false);
      return;
    }
  }

  function slugify(str: string) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async function handleAdminAddFigure(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    await adminAddFigure(formData).then((res) => {
      if (res == 'Successfully added an item!') {
        setToastType('success');
      }
      setMessage(res);
    });

    setLoading(false);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  return (
    <form onSubmit={handleAdminAddFigure}>
      <label htmlFor="brands">Brand:</label>
      <select name="brands" id="brands" required onChange={(e) => fetchAllToylines(e)}>
        <option value="">Select a brand</option>
        {brands &&
          brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name} (ID: {brand.id})
            </option>
          ))}
      </select>

      {selectedBrand && (
        <>
          <label htmlFor="toylines">Toyline:</label>
          <select name="toylines" id="toylines" required onChange={(e) => enableInputAndSubmit(e)}>
            <option value="">Select a toyline</option>
            {toylines &&
              toylines.map((toyline) => (
                <option key={toyline.id} value={toyline.id}>
                  {toyline.name} (ID: {toyline.id})
                </option>
              ))}
          </select>
        </>
      )}

      {selectedLine && (
        <>
          <label htmlFor="figureName">Figure Name:</label>
          <input type="text" name="figureName" onChange={(e) => setName(e.currentTarget.value)} />
          <p>
            URL Slug Preview: <strong>{name && <>/{slugify(name)}</>}</strong>
          </p>
          <button>Add Figure</button>
        </>
      )}

      <Toast message={message} toastType={toastType} />
    </form>
  );
}

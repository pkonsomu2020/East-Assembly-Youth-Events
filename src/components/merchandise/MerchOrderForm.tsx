import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { AlertState, MerchItem } from '../../types/domain';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { TillBox } from '../common/TillBox';
import { SizePicker } from './SizePicker';
import { ColorPicker } from './ColorPicker';

export function MerchOrderForm({ item }: { item: MerchItem }) {
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [team, setTeam] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [mpesa, setMpesa] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  const total = (item.price ?? 0) * quantity;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const payload = {
      item_name: item.name,
      size: item.hasSize ? size : null,
      color: item.hasColor ? color : null,
      team_choice: item.hasTeam ? team.trim() : null,
      quantity,
      unit_price: item.price,
      total_amount: total,
      buyer_name: buyerName.trim(),
      buyer_phone: buyerPhone.trim(),
      mpesa_message: mpesa.trim(),
      order_status: 'pending',
    };

    setSubmitting(true);
    const { error } = await supabase.from('merchandise_orders').insert(payload);
    setSubmitting(false);

    if (error) {
      setAlert({ message: 'Something went wrong. Please try again or call 0741 366 218.', type: 'error' });
      console.error(error);
      return;
    }

    setAlert({ message: "Order received! We'll confirm your payment and get your items ready.", type: 'success' });
    setSize('');
    setColor('');
    setTeam('');
    setQuantity(1);
    setBuyerName('');
    setBuyerPhone('');
    setMpesa('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
      {item.hasSize && <SizePicker value={size} onChange={setSize} />}
      {item.hasColor && <ColorPicker value={color} onChange={setColor} />}
      {item.hasTeam && (
        <div className="field">
          <label>Team of Your Choice</label>
          <input
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            placeholder="e.g. Arsenal, Manchester United"
            required
          />
        </div>
      )}
      <div className="field">
        <label>Quantity</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          required
        />
      </div>
      <div className="field">
        <label>Your Full Name</label>
        <input type="text" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} required />
      </div>
      <div className="field">
        <label>Phone Number</label>
        <input
          type="tel"
          value={buyerPhone}
          onChange={(e) => setBuyerPhone(e.target.value)}
          required
          placeholder="07XXXXXXXX"
        />
      </div>
      <TillBox totalLabel={`Ksh ${total.toLocaleString()}`} />
      <div className="field">
        <label>Paste Your M-Pesa Confirmation Message</label>
        <textarea rows={3} value={mpesa} onChange={(e) => setMpesa(e.target.value)} required />
      </div>
      <Alert state={alert} />
      <Button type="submit" variant="flame" block disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Order'}
      </Button>
    </form>
  );
}

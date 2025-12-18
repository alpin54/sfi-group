const shippingReturnData = {
  title: 'Shipping Information',
  // fallback fields used by the component's formatDate util
  created_at: '2024-07-01T08:00:00Z',
  updated_at: '2024-08-17T00:00:00Z',
  description:
    'We strive to ensure that your order reaches you safely and on time. Below is all the information you need about our shipping process.',
  body: `
    <ol>
      <li>
        <h4>Shipping Methods</h4>
        <p>We offer multiple shipping options to meet your needs:</p>
          <ul>
          <li>Standard Shipping: 3–7 business days. Cost calculated at checkout.</li>
          <li>Express Shipping: 1–3 business days. Cost calculated at checkout.</li>
          <li>Same-Day Delivery: Orders placed before 12:00 PM may be delivered the same day. Availability is limited to selected cities and subject to courier coverage.</li>
        </ul>

        <p class="note"><em>* Same-day delivery and express options depend on courier availability and your delivery address.</em></p>
      </li>

      <li>
        <h4>Shipping Rates</h4>
        <p>Shipping costs are calculated based on several factors:</p>
        <ul>
          <li>Destination — domestic or international.</li>
          <li>Package weight &amp; dimensions — oversized or heavy items may incur additional fees.</li>
          <li>Chosen delivery method — service level (standard/express/same-day).</li>
        </ul>
        <p>You can view the exact shipping cost at checkout before completing your order. Promotional free-shipping offers (if any) will be applied automatically when eligible.</p>
      </li>

      <li>
        <h4>Order Processing Time</h4>
        <ul>
          <li>Orders are typically processed within 1–2 business days after payment confirmation.</li>
          <li>Orders placed on weekends, public holidays, or outside working hours will be processed on the next business day.</li>
          <li>If an item is out of stock or delayed, we will notify you and provide options to wait, replace, or cancel.</li>
        </ul>
      </li>

      <li>
        <h4>Tracking Your Order</h4>
        <ul>
          <li>Once your order ships, a tracking number will be provided via email or WhatsApp (if you opted in).</li>
          <li>Use the tracking number to monitor your shipment in real time on our website or the courier’s tracking page.</li>
          <li>If you do not receive a tracking number within 48 hours of payment confirmation, contact our support team.</li>
        </ul>
      </li>
    </ol>


  `
};

export default shippingReturnData;

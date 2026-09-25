import { createClient } from '@supabase/supabase-js'
import './style.css'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

document.querySelector('#app').innerHTML = `
  <header class="topbar">
    <div class="container nav">
      <div class="brand">🛍️ Suki Online Shop</div>
      <div class="nav-actions">
        <button class="link-btn">Login</button>
        <button class="cart-btn">🛒 Cart <span>0</span></button>
      </div>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container hero-inner">
        <div>
          <p class="eyebrow">WELCOME TO SUKI</p>
          <h1>Shop online. Find your favorites.</h1>
          <p class="hero-text">A Filipino marketplace for customers and local sellers.</p>
          <button class="primary-btn">Start Shopping</button>
        </div>
        <div class="hero-card">🛒<br><strong>Your marketplace</strong><br>for everyday finds.</div>
      </div>
    </section>

    <section class="container section">
      <div class="section-head">
        <h2>Shop by Category</h2>
        <span>Coming soon</span>
      </div>
      <div class="categories">
        <div>📱<strong>Electronics</strong></div>
        <div>👕<strong>Fashion</strong></div>
        <div>💄<strong>Beauty</strong></div>
        <div>🏠<strong>Home & Living</strong></div>
        <div>🛒<strong>Grocery</strong></div>
        <div>🎮<strong>Toys & Games</strong></div>
      </div>
    </section>

    <section class="container section">
      <div class="section-head">
        <h2>Featured Products</h2>
        <span id="connection-status">Checking database…</span>
      </div>
      <div id="products" class="products">
        <div class="empty">Products will appear here after we connect the seller dashboard.</div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">© 2026 Suki Online Shop</div>
  </footer>
`

async function checkDatabase() {
  const status = document.querySelector('#connection-status')
  if (!supabase) {
    status.textContent = 'Database connection pending'
    return
  }
  const { error } = await supabase.from('categories').select('id').limit(1)
  status.textContent = error ? 'Database setup needs checking' : 'Database connected ✓'
}
checkDatabase()

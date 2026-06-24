// ----- script.js -----
import { initializeApp } from "firebase/app";
import { 
    getDatabase, 
    ref, 
    push, 
    onValue, 
    set, 
    get, 
    child,
    update,
    remove,
    query,
    orderByChild,
    equalTo
} from "firebase/database";

// ========== FIREBASE CONFIG ==========
const firebaseConfig = {
    apiKey: "AIzaSyCvk4yaY2r7_REoV4PZjU9H8z6ehgLAqG8",
    authDomain: "farmnest-24173.firebaseapp.com",
    databaseURL: "https://farmnest-24173-default-rtdb.firebaseio.com",
    projectId: "farmnest-24173",
    storageBucket: "farmnest-24173.firebasestorage.app",
    messagingSenderId: "42154602593",
    appId: "1:42154602593:web:2181e610aa86063a07ba20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ========== DATA ==========
const categories = ['Dairy', 'Vegetables', 'Fruits', 'Homemade'];
const filterOptions = ['All', ...categories];

// ========== FIREBASE HELPERS ==========
// Reference to products node
const productsRef = ref(database, 'products');

// Function to add product to Firebase
async function addProductToFirebase(product) {
    try {
        console.log("tEST");
        const newProductRef = push(productsRef);
        await set(newProductRef, {
            ...product,
            timestamp: Date.now(),
            id: newProductRef.key
        });
        return newProductRef.key;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
}

// Function to get products from Firebase
function getProductsFromFirebase(callback) {
    onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const products = Object.values(data);
            callback(products);
        } else {
            callback([]);
        }
    }, (error) => {
        console.error("Error fetching products:", error);
        callback([]);
    });
}

// ========== HOME PAGE ==========
function renderHome(products) {
    // Featured products
    const grid = document.getElementById('homeProductGrid');
    if (products && products.length > 0) {
        // Show first 4 products as featured
        const featured = products.slice(0, 4);
        grid.innerHTML = featured.map(item => `
            <div class="product-card">
                <img src="${item.image || 'https://via.placeholder.com/400x400?text=No+Image'}" alt="${item.name}" loading="lazy" />
                <div class="name">${item.name}</div>
                <div class="price">Rs. ${item.price}</div>
            </div>
        `).join('');
    } else {
        grid.innerHTML = `<div style="text-align:center; padding:20px; color:#888;">No products available</div>`;
    }

    // Categories
    const catWrap = document.getElementById('homeCategories');
    catWrap.innerHTML = categories.map(cat => `
        <span class="category-chip">${cat}</span>
    `).join('');

    // Stats
    const stats = document.getElementById('homeStats');
    const productCount = products ? products.length : 0;
    // Count unique sellers (approximate)
    const sellers = products ? new Set(products.map(p => p.seller)).size : 0;
    stats.innerHTML = `
        <div><div class="num">${productCount}</div><div class="label">Products</div></div>
        <div><div class="num">${Math.floor(productCount * 0.4)}</div><div class="label">Orders</div></div>
        <div><div class="num">${sellers || 0}</div><div class="label">Sellers</div></div>
    `;
}

// Home search filter
function setupHomeSearch(products) {
    const search = document.getElementById('homeSearch');
    search.addEventListener('input', function() {
        const q = this.value.toLowerCase();
        const cards = document.querySelectorAll('#homeProductGrid .product-card');
        cards.forEach((card, index) => {
            const name = card.querySelector('.name')?.textContent?.toLowerCase() || '';
            // Check if we have products and index is valid
            if (products && index < products.length) {
                card.style.display = name.includes(q) ? '' : 'none';
            }
        });
    });
}

// ========== SELL PAGE ==========
function setupSell() {
    // Category selector
    const catOpts = document.querySelectorAll('.cat-opt');
    let selectedCategory = 'Dairy';
    catOpts.forEach(opt => {
        opt.addEventListener('click', function() {
            catOpts.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            selectedCategory = this.dataset.cat;
        });
    });

    // Upload button (simulated)
    document.getElementById('uploadBtn').addEventListener('click', function() {
        // In a real app, you'd use Firebase Storage here
        alert('📸 Image upload feature - would use Firebase Storage');
    });

    // Sell button - save to Firebase
    document.getElementById('sellBtn').addEventListener('click', async function() {
        const name = document.getElementById('sellName').value.trim();
        const price = document.getElementById('sellPrice').value.trim();
        const desc = document.getElementById('sellDesc').value.trim();
        
        if (!name || !price) {
            alert('Please fill in product name and price.');
            return;
        }

        // Get current timestamp for product ID
        const productData = {
            name: name,
            price: price,
            description: desc || 'No description provided',
            category: selectedCategory,
            seller: 'Ramesh Kumar',
            rating: '⭐ 4.0',
            image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', // Default image
            timestamp: Date.now()
        };

        try {
            await addProductToFirebase(productData);
            alert('✅ Your product "' + name + '" has been listed LISTED for Rs. ' + price + '!');
            
            // Clear fields
            document.getElementById('sellName').value = '';
            document.getElementById('sellPrice').value = '';
            document.getElementById('sellDesc').value = '';
            catOpts.forEach(o => o.classList.remove('active'));
            document.querySelector('.cat-opt[data-cat="Dairy"]').classList.add('active');
            selectedCategory = 'Dairy';
        } catch (error) {
            alert('❌ Failed to list product. Please try again.');
            console.error(error);
        }
    });
}

// ========== BUY PAGE ==========
let currentFilter = 'All';
let searchTerm = '';
let allProducts = [];

function renderBuyItems(products) {
    const list = document.getElementById('buyList');
    if (!products || products.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding:30px 0; color:#888;">No products available</div>`;
        return;
    }

    const filtered = products.filter(item => {
        const matchCategory = currentFilter === 'All' || item.category === currentFilter;
        const matchSearch = (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (item.seller || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding:30px 0; color:#888;">No products found</div>`;
        return;
    }

    list.innerHTML = filtered.map(item => `
        <div class="buy-item" data-id="${item.id || ''}">
            <img src="${item.image || 'https://via.placeholder.com/400x400?text=No+Image'}" alt="${item.name}" loading="lazy" />
            <div class="buy-info">
                <div class="name">${item.name}</div>
                <div class="price">Rs. ${item.price}</div>
                <div class="seller">by ${item.seller || 'Unknown Seller'}</div>
                <div class="rating">${item.rating || '⭐ 4.0'}</div>
                <button class="order-btn" data-id="${item.id || ''}">Order Now</button>
            </div>
        </div>
    `).join('');

    // attach order events
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const itemName = this.closest('.buy-item').querySelector('.name').textContent;
            alert('🛒 Order placed for ' + itemName + '! Seller will be notified.');
        });
    });
}

function setupBuy() {
    // Filter chips
    const container = document.getElementById('filterContainer');
    container.innerHTML = filterOptions.map(opt => `
        <span class="filter-chip ${opt === 'All' ? 'active' : ''}" data-filter="${opt}">${opt}</span>
    `).join('');

    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            chips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderBuyItems(allProducts);
        });
    });

    // Search
    document.getElementById('buySearch').addEventListener('input', function() {
        searchTerm = this.value;
        renderBuyItems(allProducts);
    });
}

// ========== PROFILE PAGE ==========
function renderProfile() {
    // Stats
    const stats = document.getElementById('profileStats');
    stats.innerHTML = `
        <div class="stat"><div class="num">${allProducts.length}</div><div class="label">Products</div></div>
        <div class="stat"><div class="num">47</div><div class="label">Orders</div></div>
        <div class="stat"><div class="num">4.8</div><div class="label">Rating</div></div>
    `;

    // Account menu
    const accountMenu = document.getElementById('accountMenu');
    const accountItems = [
        { icon: 'fa-user-edit', label: 'Edit Profile' },
        { icon: 'fa-box', label: 'My Orders' },
        { icon: 'fa-chart-line', label: 'My Sales' },
        { icon: 'fa-star', label: 'Reviews' },
    ];
    accountMenu.innerHTML = accountItems.map(item => `
        <button class="menu-item">
            <i class="fas ${item.icon}"></i> ${item.label} <span class="arrow">›</span>
        </button>
    `).join('');

    // Preferences menu (with switches)
    const prefMenu = document.getElementById('preferencesMenu');
    prefMenu.innerHTML = `
        <div class="menu-item">
            <i class="fas fa-bell"></i> Notifications
            <span class="toggle-wrap"><div class="switch on" id="notifSwitch"></div></span>
        </div>
        <div class="menu-item">
            <i class="fas fa-moon"></i> Dark Mode
            <span class="toggle-wrap"><div class="switch" id="darkSwitch"></div></span>
        </div>
        <button class="menu-item">
            <i class="fas fa-shield-alt"></i> Privacy &amp; Security <span class="arrow">›</span>
        </button>
        <button class="menu-item">
            <i class="fas fa-question-circle"></i> Help &amp; Support <span class="arrow">›</span>
        </button>
    `;

    // Switch toggles
    document.querySelectorAll('.switch').forEach(sw => {
        sw.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('on');
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            alert('Logged out (simulated)');
        }
    });
}

// ========== TAB NAVIGATION ==========
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const pageIds = ['page-home', 'page-sell', 'page-buy', 'page-profile'];

    function showPage(pageId) {
        // hide all pages
        pageIds.forEach(id => {
            document.getElementById(id).classList.remove('active');
        });
        // show target
        const target = document.getElementById(pageId);
        if (target) target.classList.add('active');

        // update tab buttons
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.page === pageId) {
                btn.classList.add('active');
            }
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const pageId = this.dataset.page;
            if (pageId) showPage(pageId);
        });
    });
}

// ========== SEED INITIAL DATA (Optional) ==========
async function seedInitialData() {
    // Check if we already have data
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
        return; // Data already exists
    }

    // Initial product data
    const initialProducts = [
        { 
            name: 'Fresh Cow Milk', 
            price: '120/L', 
            category: 'Dairy', 
            seller: 'Sharma Dairy Farm', 
            rating: '⭐ 4.8', 
            image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
            description: 'Fresh cow milk from local farm'
        },
        { 
            name: 'Organic Tomatoes', 
            price: '80/Kg', 
            category: 'Vegetables', 
            seller: 'Green Valley Farm', 
            rating: '⭐ 4.6', 
            image: 'https://images.unsplash.com/photo-1546470427-e5ac89cd0b53?w=400',
            description: 'Organically grown tomatoes'
        },
        { 
            name: 'Fresh Apples', 
            price: '150/Kg', 
            category: 'Fruits', 
            seller: 'Himalayan Orchard', 
            rating: '⭐ 4.9', 
            image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400',
            description: 'Fresh apples from Himalayan region'
        },
        { 
            name: 'Homemade Mango Pickle', 
            price: '250/Jar', 
            category: 'Homemade', 
            seller: "Auntie's Kitchen", 
            rating: '⭐ 4.7', 
            image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400',
            description: 'Traditional homemade mango pickle'
        }
    ];

    for (const product of initialProducts) {
        await addProductToFirebase(product);
    }
    console.log('✅ Initial data seeded to Firebase');
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', function() {
    // Setup tabs and UI first
    setupTabs();
    setupSell();
    setupBuy();
    renderProfile();

    // Seed initial data (optional)
    seedInitialData().catch(console.error);

    // Listen for real-time product updates
    getProductsFromFirebase((products) => {
        allProducts = products || [];
        
        // Update home page
        renderHome(allProducts);
        setupHomeSearch(allProducts);
        
        // Update buy page
        renderBuyItems(allProducts);
    });

    console.log('🌾 FarmNest web app ready with Firebase integration');
});
/**
 * RAFA_SYSTEM.exe - MASTER SCRIPT 2026
 * Author: Eric (Rafa_Astiani)
 * Version: 3.5 (Integrated Signal & Latency)
 */

// --- 1. FUNGSI DETEKSI SISTEM LENGKAP ---
function initSystemDiagnostics() {
    // A. Deteksi OS
    const osEl = document.getElementById('os-name');
    if (osEl) {
        let platform = navigator.platform;
        osEl.innerText = platform.includes('Win') ? 'Windows_OS' : platform.includes('Mac') ? 'macOS_Sys' : 'Linux_Kernel';
    }

    // B. Deteksi Arsitektur (ARCH)
    const archEl = document.getElementById('sys-arch');
    if (archEl) {
        const is64 = navigator.userAgent.includes("Win64") || navigator.userAgent.includes("x64") || navigator.userAgent.includes("wow64");
        archEl.innerText = is64 ? "X64_BASED" : "X86_BASED";
    }

    // C. Deteksi Browser
    const browserEl = document.getElementById('browser-info');
    if (browserEl) {
        const agent = navigator.userAgent;
        browserEl.innerText = agent.includes("Chrome") ? "Chrome_Engine" : agent.includes("Firefox") ? "Firefox_Quantum" : "Webkit_Browser";
    }

    // D. Deteksi Resolusi
    const resEl = document.getElementById('screen-res');
    if (resEl) {
        resEl.innerText = `${window.screen.width}x${window.screen.height}_PX`;
    }
}

// --- 2. FUNGSI NETWORK & SIGNAL (WIFI) ---
function initNetworkDiagnostics() {
    const wifiEl = document.getElementById('wifi-info');
    const pingEl = document.getElementById('ping-val');
    
    // Fungsi Update Signal
    const updateNetworkStatus = () => {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn && wifiEl) {
            const type = conn.effectiveType || "Unknown";
            const speed = conn.downlink ? conn.downlink + "Mbps" : "---";
            wifiEl.innerText = `${type.toUpperCase()} | ${speed}`;
            wifiEl.style.color = (type === '4g') ? "var(--main-accent)" : "#ffb86c";
        } else if (wifiEl) {
            wifiEl.innerText = "LAN_CONNECTED";
        }
    };

    // Simulasi Latency/Ping (10ms - 60ms)
    setInterval(() => {
        if (pingEl) {
            const ping = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
            pingEl.innerText = ping + "ms";
            pingEl.style.color = ping > 45 ? "#ff5f56" : "var(--main-accent)";
        }
    }, 2000);

    updateNetworkStatus();
    if (navigator.connection) {
        navigator.connection.addEventListener('change', updateNetworkStatus);
    }
}

// --- 3. FUNGSI SIMULASI HARDWARE (CPU & RAM) ---
function initHardwareSim() {
    const cpuBar = document.getElementById('cpu-bar');
    const ramBar = document.getElementById('ram-bar');

    setInterval(() => {
        if (cpuBar) {
            const cpuLoad = Math.floor(Math.random() * (85 - 30 + 1)) + 30;
            cpuBar.style.width = cpuLoad + "%";
            cpuBar.style.background = cpuLoad > 80 ? "#ff5f56" : "var(--main-accent)";
        }
        if (ramBar) {
            const ramLoad = Math.floor(Math.random() * (65 - 40 + 1)) + 40;
            ramBar.style.width = ramLoad + "%";
        }
    }, 2500);
}

// --- 4. FUNGSI BATERAI ---
function initBatteryStatus() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            const updateAll = () => {
                const level = Math.round(battery.level * 100);
                const battBar = document.getElementById('batt-bar');
                const statusEl = document.getElementById('batt-status');
                
                if(battBar) {
                    battBar.style.width = level + "%";
                    battBar.style.background = level <= 20 ? "#ff5f56" : "var(--main-accent)";
                }
                if(statusEl) {
                    statusEl.innerText = `${level}% | ${battery.charging ? "CHARGING..." : "DISCHARGING"}`;
                }
            };
            updateAll();
            battery.addEventListener('chargingchange', updateAll);
            battery.addEventListener('levelchange', updateAll);
        });
    }
}

// --- 5. ENGINE UTAMA ---
document.addEventListener("DOMContentLoaded", () => {
    
    // Jalankan semua modul diagnostik
    initSystemDiagnostics(); 
    initNetworkDiagnostics();
    initBatteryStatus();
    initHardwareSim();

    // A. Efek Mesin Tik (Optimized)
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.innerText;
        typewriterElement.innerText = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typewriterElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // B. Custom Cursor (Smooth with requestAnimationFrame)
    // B. Custom Cursor (Smooth with requestAnimationFrame)
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            // Angka -3 didapat dari lebar kursor (6px) dibagi 2
            cursor.style.left = e.clientX - 3 + 'px'; 
            cursor.style.top = e.clientY - 3 + 'px';
        });
    });
}

    // C. Live Clock & Log System
    setInterval(() => {
        const now = new Date();
        const clockEl = document.getElementById('side-clock');
        if(clockEl) clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: false });

        const logBox = document.getElementById('sidebar-log');
        if(logBox && now.getSeconds() % 4 === 0) {
            const logs = ["> Sys_Watch", "> Pinging...", "> Recv_OK", "> Encrypt_On", "> Auth_Pass", "> Shield_Active"];
            const p = document.createElement('p');
            p.style.margin = "2px 0";
            p.innerText = logs[Math.floor(Math.random() * logs.length)];
            logBox.appendChild(p);
            if (logBox.childNodes.length > 4) logBox.removeChild(logBox.firstChild);
        }
    }, 1000);

    // D. Smooth Scroll untuk Navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
            }
        });
    });
});
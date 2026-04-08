/**
 * Horalix P2P — Enhancement Layer v2
 *
 * Features:
 *  - Transfer Mode system (Turbo / Balanced / Eco / Mobile) with REST API
 *  - Canvas speed graph (dual-channel, animated)
 *  - Live search/filter with highlighting
 *  - Keyboard shortcut system with overlay
 *  - Navbar scroll shadow
 *  - Connection quality status enrichment
 *  - Toast notifications
 *  - Smart panel expand / scroll
 *  - System theme sync
 */
;(function (window, document) {
  'use strict';

  /* =========================================================================
     TRANSFER MODES
     ========================================================================= */

  var MODES = {
    turbo: {
      name: 'Turbo',
      icon: '⚡',
      desc: 'Max speed, no limits',
      color: '#00E5B0',
      options: {
        maxSendKbps: 0,          // unlimited
        maxRecvKbps: 0,          // unlimited
        limitBandwidthInLan: false
      },
      folderHints: {
        // Compression: never (0), higher copiers, higher pending
        compressionHint: 'never',
        copiers: 8,
        pullerMaxPendingKiB: 524288  // 512 MiB
      },
      deviceCompression: 'never'
    },
    balanced: {
      name: 'Balanced',
      icon: '⚖️',
      desc: 'Default — great for most',
      color: '#4A8FFF',
      options: {
        maxSendKbps: 0,
        maxRecvKbps: 0,
        limitBandwidthInLan: false
      },
      folderHints: {
        compressionHint: 'metadata',
        copiers: 2,
        pullerMaxPendingKiB: 32768   // 32 MiB (default)
      },
      deviceCompression: 'metadata'
    },
    eco: {
      name: 'Eco',
      icon: '🍃',
      desc: 'Low CPU, always-on syncing',
      color: '#9B72FF',
      options: {
        maxSendKbps: 0,
        maxRecvKbps: 0,
        limitBandwidthInLan: false
      },
      folderHints: {
        compressionHint: 'always',
        copiers: 1,
        pullerMaxPendingKiB: 16384   // 16 MiB
      },
      deviceCompression: 'always'
    },
    mobile: {
      name: 'Mobile',
      icon: '📱',
      desc: 'Saves data & battery',
      color: '#FFD166',
      options: {
        maxSendKbps: 512,        // ~500 KB/s upload cap
        maxRecvKbps: 1024,       // ~1 MB/s download cap
        limitBandwidthInLan: false
      },
      folderHints: {
        compressionHint: 'always',
        copiers: 1,
        pullerMaxPendingKiB: 16384
      },
      deviceCompression: 'always'
    }
  };

  var currentMode = localStorage.getItem('hlx_mode') || 'balanced';

  function setTransferMode(modeKey) {
    var mode = MODES[modeKey];
    if (!mode) return;

    currentMode = modeKey;
    localStorage.setItem('hlx_mode', modeKey);
    document.body.setAttribute('data-hlx-mode', modeKey);

    // Update UI immediately
    updateModeBtns(modeKey);
    updateModeLabel(mode);
    updateTransferModeCardBorder(mode.color);

    // Apply via REST API using Angular's $http (CSRF-safe)
    withAngular(function (injector) {
      var $http = injector.get('$http');

      // Patch global options
      $http.patch('/rest/config', { options: mode.options }).then(function () {
        showToast(mode.icon + ' ' + mode.name + ' mode applied', mode.color);
        // Trigger config save notification
        updateSaveNotification(injector);
      }, function () {
        showToast('⚠️ Could not apply mode — check API access', '#FF9B50');
      });
    });
  }

  function updateModeBtns(activeKey) {
    document.querySelectorAll('.hlx-mode-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === activeKey);
    });
  }

  function updateModeLabel(mode) {
    var el = document.getElementById('hlxModeActiveLabel');
    if (el) el.textContent = mode.name;
  }

  function updateTransferModeCardBorder(color) {
    var card = document.getElementById('hlxTransferModeCard');
    if (card) card.style.borderTopColor = color;
  }

  function updateSaveNotification(injector) {
    try {
      var $rootScope = injector.get('$rootScope');
      $rootScope.$applyAsync(function () {
        $rootScope.configInSync = false;
      });
    } catch (e) {}
  }

  /* =========================================================================
     TRANSFER MODE CARD INJECTION
     ========================================================================= */

  function injectTransferModeCard() {
    if (document.getElementById('hlxTransferModeCard')) return;

    // Find the stats bar to inject after it
    var statsBar = document.querySelector('.hlx-stats-bar');
    if (!statsBar) {
      setTimeout(injectTransferModeCard, 500);
      return;
    }

    var card = document.createElement('div');
    card.id = 'hlxTransferModeCard';

    var mode = MODES[currentMode];

    card.innerHTML = [
      '<div class="hlx-mode-header">',
        '<div class="hlx-mode-title">',
          '<span class="fa fa-tachometer-alt"></span>',
          'Transfer Mode',
        '</div>',
        '<div class="hlx-mode-active-label" id="hlxModeHeaderLabel">',
          '<span id="hlxModeActiveLabel">', mode.name, '</span>',
        '</div>',
      '</div>',
      '<div class="hlx-modes">',
        modeBtn('turbo',    '⚡', 'Turbo',    'Max speed — LAN / high-end'),
        modeBtn('balanced', '⚖️', 'Balanced', 'Best for most connections'),
        modeBtn('eco',      '🍃', 'Eco',      'Low CPU — always-on syncing'),
        modeBtn('mobile',   '📱', 'Mobile',   'Saves data &amp; battery'),
      '</div>',
    ].join('');

    statsBar.parentNode.insertBefore(card, statsBar.nextSibling);

    // Attach click handlers
    card.querySelectorAll('.hlx-mode-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTransferMode(this.getAttribute('data-mode'));
      });
    });

    // Init state
    updateModeBtns(currentMode);
    updateTransferModeCardBorder(mode.color);
    document.body.setAttribute('data-hlx-mode', currentMode);
  }

  function modeBtn(key, icon, name, desc) {
    return [
      '<button class="hlx-mode-btn" data-mode="', key, '">',
        '<span class="hlx-mode-icon">', icon, '</span>',
        '<span class="hlx-mode-name">', name, '</span>',
        '<span class="hlx-mode-desc">', desc, '</span>',
      '</button>',
    ].join('');
  }

  /* =========================================================================
     CANVAS SPEED GRAPH
     ========================================================================= */

  var speedHistory = {
    down: new Array(60).fill(0),
    up:   new Array(60).fill(0)
  };

  var canvas, ctx;
  var animFrame;

  function initSpeedCanvas() {
    var statDown = document.querySelector('.hlx-stat-down');
    if (!statDown || document.getElementById('hlxSpeedCanvas')) return;

    canvas = document.createElement('canvas');
    canvas.id = 'hlxSpeedCanvas';
    canvas.width = 120;
    canvas.height = 28;
    canvas.title = 'Transfer speed history';
    canvas.style.cssText = 'display:block;margin-top:5px;border-radius:4px;opacity:0.9;';

    statDown.appendChild(canvas);
    ctx = canvas.getContext('2d');
    drawSpeedGraph();
  }

  function pushSpeed(down, up) {
    speedHistory.down.push(down);
    speedHistory.up.push(up);
    speedHistory.down.shift();
    speedHistory.up.shift();
  }

  function drawSpeedGraph() {
    if (!ctx) return;
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    var allVals = speedHistory.down.concat(speedHistory.up);
    var maxVal  = Math.max.apply(null, allVals) || 1;
    var n       = speedHistory.down.length;
    var step    = W / (n - 1);

    // Fill under download line (green)
    ctx.beginPath();
    speedHistory.down.forEach(function (v, i) {
      var x = i * step;
      var y = H - (v / maxVal) * H;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.lineTo((n - 1) * step, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    var downFill = ctx.createLinearGradient(0, 0, 0, H);
    downFill.addColorStop(0, 'rgba(0,229,176,0.35)');
    downFill.addColorStop(1, 'rgba(0,229,176,0)');
    ctx.fillStyle = downFill;
    ctx.fill();

    // Draw download line
    ctx.beginPath();
    speedHistory.down.forEach(function (v, i) {
      var x = i * step;
      var y = H - (v / maxVal) * H;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#00E5B0';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw upload line
    ctx.beginPath();
    speedHistory.up.forEach(function (v, i) {
      var x = i * step;
      var y = H - (v / maxVal) * H;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = 'rgba(74,143,255,0.75)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 2]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  /* =========================================================================
     LIVE SEARCH / FILTER
     ========================================================================= */

  var searchInput;

  function initSearch() {
    searchInput = document.getElementById('hlxSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
      filterPanels(this.value.trim().toLowerCase());
    });

    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        this.value = '';
        filterPanels('');
        this.blur();
      }
    });
  }

  function filterPanels(q) {
    var panels = document.querySelectorAll('.panel-group .panel');
    var hasResults = false;

    panels.forEach(function (panel) {
      var titleEl = panel.querySelector('.panel-title-text');
      if (!titleEl) { show(panel); return; }
      var text = titleEl.textContent.trim().toLowerCase();

      if (!q || text.indexOf(q) !== -1) {
        show(panel);
        hasResults = true;
        // highlight match
        if (q) {
          panel.classList.add('hlx-search-match');
        } else {
          panel.classList.remove('hlx-search-match');
        }
      } else {
        panel.classList.remove('hlx-search-match');
        panel.style.display = 'none';
        panel.style.opacity = '0';
      }
    });

    // Hide empty group headers
    document.querySelectorAll('.panel-group').forEach(function (grp) {
      var visible = grp.querySelectorAll('.panel:not([style*="display: none"])').length;
      var h4 = grp.previousElementSibling;
      if (h4 && h4.tagName === 'H4') {
        h4.style.display = visible === 0 ? 'none' : '';
      }
    });

    return hasResults;
  }

  function show(el) {
    el.style.display = '';
    el.style.opacity = '';
  }

  /* =========================================================================
     KEYBOARD SHORTCUTS
     ========================================================================= */

  var SHORTCUTS = {
    '/':  function () { focusSearch(); },
    'f':  function () { clickByText('Add Folder'); },
    'd':  function () { clickByText('Add Remote Device'); },
    's':  function () { clickByText('Settings'); },
    'r':  function () { var b = findBtnByText('Rescan All'); if (b && !b.disabled) b.click(); },
    'p':  function () { clickByText('Pause All'); },
    '?':  function () { toggleKbdOverlay(); },
    'Escape': function () { hideKbdOverlay(); }
  };

  function initKeyboard() {
    document.addEventListener('keydown', function (e) {
      var tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      var handler = SHORTCUTS[e.key];
      if (handler) { e.preventDefault(); handler(); }
    });
  }

  function focusSearch() {
    var el = document.getElementById('hlxSearch');
    if (el) { el.focus(); el.select(); }
  }

  function findBtnByText(text) {
    var els = document.querySelectorAll('button, a.btn');
    for (var i = 0; i < els.length; i++) {
      if (els[i].textContent.trim().indexOf(text) !== -1) return els[i];
    }
    return null;
  }

  function clickByText(text) {
    var btn = findBtnByText(text);
    if (btn) btn.click();
  }

  /* =========================================================================
     KEYBOARD OVERLAY
     ========================================================================= */

  var kbdOverlay = null;

  function toggleKbdOverlay() {
    if (kbdOverlay) { hideKbdOverlay(); } else { showKbdOverlay(); }
  }

  function showKbdOverlay() {
    if (kbdOverlay) return;
    kbdOverlay = document.createElement('div');
    kbdOverlay.id = 'hlxKbdOverlay';

    var rows = [
      ['/', 'Focus search'],
      ['F', 'Add folder'],
      ['D', 'Add remote device'],
      ['S', 'Open settings'],
      ['R', 'Rescan all folders'],
      ['P', 'Pause all folders'],
      ['?', 'Toggle this overlay'],
      ['Esc', 'Close overlays / clear search'],
    ];

    var rowsHTML = rows.map(function (r) {
      return '<tr><td style="padding:5px 0;width:60px;">' +
        '<span style="display:inline-block;background:rgba(74,143,255,0.12);border:1px solid rgba(74,143,255,0.3);' +
        'border-radius:5px;padding:2px 9px;font-size:12px;font-weight:700;font-family:monospace;color:#4A8FFF;' +
        'letter-spacing:0.03em;">' + r[0] + '</span></td>' +
        '<td style="padding:5px 0 5px 14px;font-size:13px;color:#8899CC;">' + r[1] + '</td></tr>';
    }).join('');

    kbdOverlay.innerHTML = [
      '<div class="hlx-kbd-card" onclick="event.stopPropagation()">',
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">',
          '<img src="assets/img/horalix-icon.svg" width="28" height="28" style="opacity:0.9"/>',
          '<h3 style="margin:0!important;font-size:16px!important;text-transform:none!important;',
              'letter-spacing:0!important;color:#D6E8FF!important;font-weight:700!important;">',
              'Keyboard Shortcuts</h3>',
          '<button id="hlxKbdClose" style="margin-left:auto;background:none;border:none;',
              'color:#718BAF;font-size:22px;cursor:pointer;padding:0 4px;line-height:1;',
              'transition:color 0.15s ease;">×</button>',
        '</div>',
        '<table style="width:100%;border-collapse:separate;border-spacing:0 4px;">', rowsHTML, '</table>',
        '<p style="margin:20px 0 0;font-size:11px;color:#36506A;text-align:center;">',
          'Press <kbd style="background:rgba(74,143,255,0.1);border:1px solid rgba(74,143,255,0.25);',
          'border-radius:4px;padding:1px 6px;font-family:monospace;">?</kbd> or ',
          '<kbd style="background:rgba(74,143,255,0.1);border:1px solid rgba(74,143,255,0.25);',
          'border-radius:4px;padding:1px 6px;font-family:monospace;">Esc</kbd> to close</p>',
      '</div>',
    ].join('');

    kbdOverlay.addEventListener('click', hideKbdOverlay);

    document.getElementById('hlxKbdClose') && document.getElementById('hlxKbdClose').addEventListener('click', hideKbdOverlay);

    document.body.appendChild(kbdOverlay);

    setTimeout(function () {
      var btn = document.getElementById('hlxKbdClose');
      if (btn) btn.addEventListener('click', hideKbdOverlay);
    }, 0);
  }

  function hideKbdOverlay() {
    if (kbdOverlay) {
      kbdOverlay.style.opacity = '0';
      kbdOverlay.style.transition = 'opacity 0.15s ease';
      setTimeout(function () {
        if (kbdOverlay) { kbdOverlay.remove(); kbdOverlay = null; }
      }, 150);
    }
  }

  /* =========================================================================
     TOAST NOTIFICATIONS
     ========================================================================= */

  var toastEl = null;
  var toastTimer = null;

  function showToast(msg, color) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'hlx-toast';
      document.body.appendChild(toastEl);
    }

    toastEl.innerHTML = '<span class="fa fa-check-circle" style="color:' + (color || '#4A8FFF') + '"></span>' + msg;
    toastEl.style.borderColor = (color || '#4A8FFF');
    toastEl.style.boxShadow = '0 12px 40px rgba(0,0,0,0.6), 0 0 20px ' + hexToRgba(color || '#4A8FFF', 0.25);

    clearTimeout(toastTimer);
    toastEl.classList.add('show');

    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2800);
  }

  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  /* =========================================================================
     NAVBAR SCROLL SHADOW
     ========================================================================= */

  function initNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('hlx-scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* =========================================================================
     STATUS BADGE ENRICHMENT
     ========================================================================= */

  function enrichStatusBadges() {
    setInterval(function () {
      document.querySelectorAll('.panel-status').forEach(function (el) {
        var t = el.textContent.trim().toLowerCase();
        if (t.indexOf('syncing') !== -1) {
          el.classList.add('text-primary'); el.classList.remove('text-success','text-warning','text-danger');
        } else if (t === 'up to date' || t === 'idle') {
          el.classList.add('text-success'); el.classList.remove('text-primary','text-warning','text-danger');
        } else if (t.indexOf('paused') !== -1 || t.indexOf('stopped') !== -1) {
          el.classList.add('text-warning'); el.classList.remove('text-primary','text-success','text-danger');
        } else if (t.indexOf('error') !== -1 || t.indexOf('fail') !== -1 || t.indexOf('out of sync') !== -1) {
          el.classList.add('text-danger'); el.classList.remove('text-primary','text-success','text-warning');
        }
      });
    }, 1500);
  }

  /* =========================================================================
     STATUS DOT IN STATS BAR
     ========================================================================= */

  function updateStatusDot(status) {
    var dot = document.querySelector('.hlx-dot');
    if (!dot) return;
    dot.className = 'hlx-dot';
    var label = document.querySelector('.hlx-status-label');

    var statusMap = {
      'syncing': 'syncing',
      'scanning': 'scanning',
      'error': 'offline',
      'paused': 'paused',
      'idle': '',
      'unknown': ''
    };

    var cls = statusMap[status] || '';
    if (cls) dot.classList.add(cls);
    if (label) {
      label.textContent = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Online';
    }
  }

  /* =========================================================================
     PANEL SMOOTH EXPAND
     ========================================================================= */

  function initPanelExpand() {
    document.addEventListener('click', function (e) {
      var heading = e.target.closest('button.panel-heading');
      if (!heading) return;
      var target = heading.getAttribute('data-target');
      if (!target) return;
      setTimeout(function () {
        var panel = document.querySelector(target);
        if (panel && panel.classList.contains('in')) {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 320);
    });
  }

  /* =========================================================================
     ANGULAR INTEGRATION
     ========================================================================= */

  var cachedInjector = null;

  function withAngular(cb) {
    if (cachedInjector) { cb(cachedInjector); return; }
    var tries = 0;
    function attempt() {
      try {
        var appEl = document.querySelector('[ng-app]') || document.querySelector('[data-ng-app]');
        if (appEl) {
          var inj = window.angular && window.angular.element(appEl).injector();
          if (inj) { cachedInjector = inj; cb(inj); return; }
        }
      } catch (e) {}
      if (++tries < 80) setTimeout(attempt, 150);
    }
    attempt();
  }

  function hookAngularPolling() {
    withAngular(function (injector) {
      var $rootScope = injector.get('$rootScope');

      setInterval(function () {
        // Speed data
        var conns = $rootScope.connectionsTotal;
        if (conns) {
          pushSpeed(conns.inbps || 0, conns.outbps || 0);
          drawSpeedGraph();
          updateSparkBars(conns.inbps || 0, conns.outbps || 0);
        }

        // Status dot
        var status = typeof $rootScope.syncthingStatus === 'function'
          ? $rootScope.syncthingStatus()
          : null;
        if (status) updateStatusDot(status);

      }, 1800);
    });
  }

  /* =========================================================================
     SPARKLINE BARS (lightweight fallback for canvas)
     ========================================================================= */

  var sparkDownHistory = [];
  var sparkUpHistory   = [];
  var SPARK_N = 18;

  function updateSparkBars(down, up) {
    sparkDownHistory.push(down); if (sparkDownHistory.length > SPARK_N) sparkDownHistory.shift();
    sparkUpHistory.push(up);     if (sparkUpHistory.length   > SPARK_N) sparkUpHistory.shift();

    renderSpark('hlxSparkDown', sparkDownHistory, 'var(--hlx-green)');
    renderSpark('hlxSparkUp',   sparkUpHistory,   'var(--hlx-blue)');
  }

  function renderSpark(id, data, color) {
    var el = document.getElementById(id);
    if (!el) return;
    var max = Math.max.apply(null, data) || 1;
    el.innerHTML = data.map(function (v) {
      var h = Math.max(2, Math.round((v / max) * 22));
      return '<div class="hlx-spark-bar" style="height:' + h + 'px;background:' + color + ';opacity:' +
             (0.35 + (v / max) * 0.65).toFixed(2) + '"></div>';
    }).join('');
  }

  function injectSparkContainers() {
    var downItem = document.querySelector('.hlx-stat-down');
    var upItem   = document.querySelector('.hlx-stat-up');

    if (downItem && !document.getElementById('hlxSparkDown')) {
      var d = document.createElement('div');
      d.id = 'hlxSparkDown';
      d.className = 'hlx-spark';
      d.title = 'Download speed history';
      downItem.querySelector('div') && downItem.querySelector('div').appendChild(d);
    }

    if (upItem && !document.getElementById('hlxSparkUp')) {
      var u = document.createElement('div');
      u.id = 'hlxSparkUp';
      u.className = 'hlx-spark';
      u.title = 'Upload speed history';
      upItem.querySelector('div') && upItem.querySelector('div').appendChild(u);
    }
  }

  /* =========================================================================
     SYSTEM THEME
     ========================================================================= */

  function applySystemTheme() {
    var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-hlx-theme', dark ? 'dark' : 'dark'); // always dark for Horalix
  }

  /* =========================================================================
     INIT
     ========================================================================= */

  function init() {
    applySystemTheme();
    initKeyboard();
    initNavbarScroll();
    enrichStatusBadges();
    initPanelExpand();

    // Wait for Angular / DOM
    setTimeout(function () {
      initSearch();
      injectTransferModeCard();
      injectSparkContainers();
      initSpeedCanvas();
      hookAngularPolling();

      // Apply stored mode indicator
      document.body.setAttribute('data-hlx-mode', currentMode);
      updateModeBtns(currentMode);
    }, 600);

    // Retry inject if DOM not ready
    setTimeout(function () {
      injectTransferModeCard();
      injectSparkContainers();
      initSpeedCanvas();
    }, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}(window, document));

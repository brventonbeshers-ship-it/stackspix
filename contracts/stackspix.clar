;; stackspix - 50x50 on-chain pixel board
;; Contract: stackspix
;; Network: Stacks Mainnet

(define-constant GRID-SIZE u50)
(define-constant MAX-INDEX u2499) ;; 0..2499

;; Errors
(define-constant ERR-OUT-OF-BOUNDS (err u1))
(define-constant ERR-INVALID-COLOR (err u2))

;; Pixel storage: index = y*50 + x
(define-map pixels
  { index: uint }
  { color: (string-ascii 6), owner: principal, placed-at: uint }
)

;; Per-user pixel count
(define-map user-pixel-count
  { user: principal }
  { count: uint }
)

;; Total pixels ever placed (not unique - overwrites count too)
(define-data-var total-placed uint u0)

;; Place a pixel
(define-public (place-pixel (x uint) (y uint) (color (string-ascii 6)))
  (let (
    (index (+ (* y GRID-SIZE) x))
    (caller tx-sender)
  )
    (asserts! (< x GRID-SIZE) ERR-OUT-OF-BOUNDS)
    (asserts! (< y GRID-SIZE) ERR-OUT-OF-BOUNDS)
    (asserts! (is-eq (len color) u6) ERR-INVALID-COLOR)

    (map-set pixels
      { index: index }
      { color: color, owner: caller, placed-at: block-height }
    )

    (map-set user-pixel-count
      { user: caller }
      { count: (+ (get-user-count caller) u1) }
    )

    (var-set total-placed (+ (var-get total-placed) u1))
    (ok true)
  )
)

;; Read a pixel
(define-read-only (get-pixel (x uint) (y uint))
  (let ((index (+ (* y GRID-SIZE) x)))
    (map-get? pixels { index: index })
  )
)

;; Read pixel by index
(define-read-only (get-pixel-by-index (index uint))
  (map-get? pixels { index: index })
)

;; User pixel count
(define-read-only (get-user-count (user principal))
  (default-to u0 (get count (map-get? user-pixel-count { user: user })))
)

;; Total placed
(define-read-only (get-total-placed)
  (var-get total-placed)
)

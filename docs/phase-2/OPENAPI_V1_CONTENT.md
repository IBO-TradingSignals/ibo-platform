# packages/contracts/openapi.yaml — Phase 2 (محتوای کامل جایگزین نسخه Health-only)

> این محتوا باید توسط OpenCode داخل `packages/contracts/openapi.yaml` جایگزین نسخه فعلی شود (که فقط Health داشت). Health endpoint باید حفظ شود، نه حذف.

```yaml
openapi: 3.1.0
info:
  title: IBO Platform API
  version: 0.2.0
  description: >-
    Single Source of Truth contract for all IBO Platform clients
    (Web/PWA, Android, Admin). Phase 2 scope: full resource shapes and
    the signal state machine. Auth enforcement implemented in Phase 3.
servers:
  - url: http://localhost:3000/v1
    description: Local development
tags:
  - { name: Health, description: Service liveness }
  - { name: Signals, description: Signal lifecycle — human confirmation required for publish }
  - { name: Subscriptions, description: Plans, subscriptions, entitlements }
  - { name: Instruments, description: Tradable instruments per market domain }

paths:
  /health:
    get:
      operationId: getHealth
      tags: [Health]
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { $ref: '#/components/schemas/HealthResponse' }

  /v1/signals:
    post:
      operationId: createSignal
      tags: [Signals]
      summary: Create a signal draft (human analyst only)
      security: [{ userAuth: [] }]
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/SignalCreateRequest' }
      responses:
        '201':
          description: Draft created
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Signal' }

  /v1/signals/{id}/validate:
    post:
      operationId: validateSignal
      tags: [Signals]
      summary: Structural validation (may be called by a scoped agent token)
      security: [{ userAuth: [] }, { agentAuth: [] }]
      parameters: [{ $ref: '#/components/parameters/SignalId' }]
      responses:
        '200': { description: Validated, content: { application/json: { schema: { $ref: '#/components/schemas/Signal' } } } }

  /v1/signals/{id}/preview:
    post:
      operationId: previewSignal
      tags: [Signals]
      summary: Generate final preview for the analyst
      security: [{ userAuth: [] }]
      parameters: [{ $ref: '#/components/parameters/SignalId' }]
      responses:
        '200': { description: Preview ready, content: { application/json: { schema: { $ref: '#/components/schemas/Signal' } } } }

  /v1/signals/{id}/confirm:
    post:
      operationId: confirmSignal
      tags: [Signals]
      summary: Human confirmation — the ONLY endpoint that may set status=CONFIRMED
      description: >-
        MUST reject agentAuth tokens at the authorization layer, not only by
        omission from the security list here. See API_CONTRACTS.md §2/§3.
      security: [{ userAuth: [] }]
      parameters: [{ $ref: '#/components/parameters/SignalId' }]
      responses:
        '200': { description: Confirmed, content: { application/json: { schema: { $ref: '#/components/schemas/Signal' } } } }
        '403': { description: Forbidden — agent tokens are never accepted here }

  /v1/signals/{id}/publish:
    post:
      operationId: publishSignal
      tags: [Signals]
      summary: Publish a confirmed signal
      security: [{ userAuth: [] }]
      parameters: [{ $ref: '#/components/parameters/SignalId' }]
      responses:
        '200': { description: Published, content: { application/json: { schema: { $ref: '#/components/schemas/Signal' } } } }

  /v1/signals/{id}/cancel:
    post:
      operationId: cancelSignal
      tags: [Signals]
      summary: Cancel before publish
      security: [{ userAuth: [] }]
      parameters: [{ $ref: '#/components/parameters/SignalId' }]
      responses:
        '200': { description: Cancelled }

  /v1/signals/{id}:
    get:
      operationId: getSignal
      tags: [Signals]
      security: [{ userAuth: [] }]
      parameters: [{ $ref: '#/components/parameters/SignalId' }]
      responses:
        '200': { description: OK, content: { application/json: { schema: { $ref: '#/components/schemas/Signal' } } } }

  /v1/plans:
    get:
      operationId: listPlans
      tags: [Subscriptions]
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { type: array, items: { $ref: '#/components/schemas/Plan' } }

  /v1/instruments:
    get:
      operationId: listInstruments
      tags: [Instruments]
      parameters:
        - name: marketDomain
          in: query
          schema: { $ref: '#/components/schemas/MarketDomain' }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { type: array, items: { $ref: '#/components/schemas/Instrument' } }

components:
  securitySchemes:
    userAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Human user token (carries Role — OWNER/ANALYST/SUPPORT/SUBSCRIBER)
    agentAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Scoped agent token (carries Agent ID + Permission Matrix scope). Never valid on /confirm or /publish.

  parameters:
    SignalId:
      name: id
      in: path
      required: true
      schema: { type: string, format: uuid }

  schemas:
    HealthResponse:
      type: object
      required: [status, version]
      properties:
        status: { type: string, enum: [ok] }
        version: { type: string, example: 0.1.0 }

    MarketDomain:
      type: string
      enum: [BINARY_INTERNATIONAL, BINARY_OTC, CRYPTO_SPOT, CRYPTO_FUTURES, FOREX]

    SignalStatus:
      type: string
      enum: [DRAFT, VALIDATED, PREVIEW, CONFIRMED, PUBLISHED, CANCELLED, EXPIRED]

    SignalCreateRequest:
      type: object
      required: [templateId, instrumentId, payload]
      properties:
        templateId: { type: string, format: uuid }
        instrumentId: { type: string, format: uuid }
        payload: { type: object, description: "Dynamic fields per SignalTemplate.fieldsSchema" }

    Signal:
      type: object
      properties:
        id: { type: string, format: uuid }
        templateId: { type: string, format: uuid }
        instrumentId: { type: string, format: uuid }
        marketDomain: { $ref: '#/components/schemas/MarketDomain' }
        status: { $ref: '#/components/schemas/SignalStatus' }
        payload: { type: object }
        createdByUserId: { type: string, format: uuid }
        confirmedByUserId: { type: string, format: uuid, nullable: true }
        confirmedAt: { type: string, format: date-time, nullable: true }
        publishedAt: { type: string, format: date-time, nullable: true }
        createdAt: { type: string, format: date-time }

    Plan:
      type: object
      properties:
        id: { type: string, format: uuid }
        name: { type: string }
        durationDays: { type: integer }
        price: { type: number }
        currency: { type: string, example: USD }
        marketDomains:
          type: array
          items: { $ref: '#/components/schemas/MarketDomain' }

    Instrument:
      type: object
      properties:
        id: { type: string, format: uuid }
        symbol: { type: string }
        name: { type: string }
        marketDomain: { $ref: '#/components/schemas/MarketDomain' }
        isActive: { type: boolean }
```

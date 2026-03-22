# AGENTS.md - ClipMart Working Guide

This repository is the working home for ClipMart, a media and clip management product. Treat it as an application with real data flows, not as a generic `create-next-app` scaffold.

## Goal

- build a useful clip and media management system
- organize video, clip, and asset workflows into a searchable product
- turn the current scaffold into a real app with authentication, storage, metadata, and retrieval

## Current Idea And Progress

- Product idea:
  a clip library for managing media assets, metadata, collections, and retrieval
- Current state:
  early Next.js scaffold with clear signs of future backend integration
- Existing signals:
  `Next.js`, `Drizzle`, `better-auth`, `postgres`, and `Supabase` dependencies are already present
- Progress level:
  foundation stage, not yet a mature working product

## Initial Setup Requirements

- Node.js 20+
- install dependencies:
  `npm install`
- run locally:
  `npm run dev`
- add a real `.env.example` if it does not already exist before expanding backend work

## Environments

- local development:
  Next.js app on the default local port
- staging:
  recommended once auth and database migrations are active
- production:
  should come only after storage, auth, and upload flows are verified

## Dependencies

- frontend:
  Next.js, React
- backend-in-app:
  Next.js server routes or server actions
- database:
  Postgres via `drizzle-orm`
- auth:
  `better-auth`
- storage / media:
  likely Supabase or another object store

## Backend Need

- backend required:
  yes
- likely backend shape:
  Next.js full-stack app using server routes or server actions, plus Postgres and object storage
- separate backend service:
  not necessary at first

## Backend Development Plan

1. Define the core entities:
   user, clip, source asset, tag, collection, project, share link, processing state.
2. Create database schema and migration flow first.
3. Add auth before private asset management becomes deeper.
4. Add upload, metadata extraction, and indexing.
5. Add search, filtering, collections, and permissions.
6. Add background jobs only when ingest or transcoding needs them.

## How Development Should Progress

1. Do not stay at the scaffold stage.
2. Build one honest vertical slice:
   sign in, upload clip, tag clip, find clip again.
3. Add project and collection workflows next.
4. Improve asset preview, playback, and organization after retrieval works.
5. Add sharing, exports, or publishing only after the private library is solid.

## End Goal

The end goal is a real clip management application, not a template repo: authenticated, searchable, storage-backed, and actually useful for organizing media work.

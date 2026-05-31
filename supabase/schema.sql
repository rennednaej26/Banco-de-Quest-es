create extension if not exists "pgcrypto";

create type difficulty as enum ('facil', 'media', 'dificil');
create type review_item_type as enum ('question', 'flashcard');
create type study_mode as enum ('estudo', 'simulado', 'revisao', 'flash');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  subject text not null,
  topic text not null,
  subtopic text not null default 'Geral',
  board text not null,
  role text not null,
  year int not null,
  difficulty difficulty not null default 'media',
  statement text not null,
  alternatives jsonb not null,
  answer_index int not null,
  explanation text not null,
  tags text[] not null default '{}',
  image_url text,
  global_attempts int not null default 0,
  global_accuracy numeric(5,2) not null default 0,
  avg_time_seconds int not null default 0,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.flashcards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  deck text not null,
  subject text not null,
  front text not null,
  back text not null,
  card_type text not null default 'basic',
  tags text[] not null default '{}',
  image_url text,
  audio_url text,
  source_question_id uuid references public.questions(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mode study_mode not null,
  filters jsonb not null default '{}',
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  total_items int not null default 0,
  correct_items int not null default 0
);

create table public.user_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  session_id uuid references public.study_sessions(id) on delete set null,
  selected_index int not null,
  is_correct boolean not null,
  elapsed_seconds int not null,
  eliminated_indices int[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.user_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id uuid not null,
  item_type review_item_type not null,
  interval_days int not null default 0,
  ease_factor numeric(4,2) not null default 2.50,
  repetitions int not null default 0,
  lapses int not null default 0,
  due_at timestamptz not null default now(),
  accuracy numeric(5,2) not null default 0,
  history jsonb not null default '[]',
  updated_at timestamptz not null default now(),
  unique (user_id, item_id, item_type)
);

create table public.analytics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  topic text,
  attempts int not null default 0,
  correct int not null default 0,
  avg_time_seconds int not null default 0,
  forgotten int not null default 0,
  computed_at timestamptz not null default now(),
  unique (user_id, subject, topic)
);

create index questions_filter_idx on public.questions (subject, topic, board, year, difficulty);
create index questions_tags_idx on public.questions using gin (tags);
create index attempts_user_created_idx on public.user_attempts (user_id, created_at desc);
create index reviews_due_idx on public.user_reviews (user_id, due_at);
create index flashcards_tags_idx on public.flashcards using gin (tags);

alter table public.profiles enable row level security;
alter table public.questions enable row level security;
alter table public.flashcards enable row level security;
alter table public.study_sessions enable row level security;
alter table public.user_attempts enable row level security;
alter table public.user_reviews enable row level security;
alter table public.analytics enable row level security;

create policy "profiles own read" on public.profiles for select using (auth.uid() = id);
create policy "profiles own write" on public.profiles for update using (auth.uid() = id);
create policy "questions public or own read" on public.questions for select using (is_public or owner_id = auth.uid());
create policy "questions own insert" on public.questions for insert with check (owner_id = auth.uid());
create policy "questions own update" on public.questions for update using (owner_id = auth.uid());
create policy "flashcards own all" on public.flashcards for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "sessions own all" on public.study_sessions for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "attempts own all" on public.user_attempts for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "reviews own all" on public.user_reviews for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "analytics own read" on public.analytics for select using (user_id = auth.uid());

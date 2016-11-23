/*
 * Copyright (C) 2010 Joseph Daly <skinny.moey@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   * Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *   * Neither the name of Joseph Daly nor the names of its contributors
 *     may be used to endorse or promote products derived from this software
 *     without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

#pragma once

#include <drizzled/plugin/table_function.h>
#include <drizzled/field.h>

#include "user_commands.h"
#include "global_stats.h"
#include "logging_stats.h"

#include <vector>

class GlobalStatementsTool : public drizzled::plugin::TableFunction
{
public:
  GlobalStatementsTool(LoggingStats *logging_stats);

  class Generator : public drizzled::plugin::TableFunction::Generator
  {
  public:
    Generator(drizzled::Field **arg, LoggingStats *logging_stats);

    ~Generator();

    bool populate();

  private:
    GlobalStats *global_stats_to_display; 
    uint32_t count;
  };

  Generator *generator(drizzled::Field **arg)
  {
    return new Generator(arg, logging_stats);
  }

private:
  LoggingStats *logging_stats;
};

class SessionStatementsTool : public drizzled::plugin::TableFunction
{
public:
  SessionStatementsTool(LoggingStats *logging_stats);

  class Generator : public drizzled::plugin::TableFunction::Generator
  {
  public:
    Generator(drizzled::Field **arg, LoggingStats *logging_stats);

    bool populate();

  private:
    UserCommands *user_commands;
    uint32_t count;
  };

  Generator *generator(drizzled::Field **arg)
  {
    return new Generator(arg, logging_stats);
  }

private:
  LoggingStats *logging_stats;
};

class CurrentCommandsTool : public drizzled::plugin::TableFunction
{
public:

  CurrentCommandsTool(LoggingStats *logging_stats);

  class Generator : public drizzled::plugin::TableFunction::Generator
  {
  public:
    Generator(drizzled::Field **arg, LoggingStats *logging_stats);

    bool populate();
  private:
    LoggingStats *inner_logging_stats; 
    Scoreboard *current_scoreboard; 
    uint32_t current_bucket;
    bool isEnabled;
    std::vector<ScoreboardSlot *>::iterator scoreboard_vector_it;
    std::vector<ScoreboardSlot *>::iterator scoreboard_vector_end;
    std::vector<std::vector<ScoreboardSlot* >* >::iterator vector_of_scoreboard_vectors_it;
    std::vector<std::vector<ScoreboardSlot* >* >::iterator vector_of_scoreboard_vectors_end; 
    boost::shared_mutex* current_lock;

    void setVectorIteratorsAndLock(uint32_t bucket_number);
  };

  Generator *generator(drizzled::Field **arg)
  {
    return new Generator(arg, outer_logging_stats);
  }
private:
  LoggingStats *outer_logging_stats;
};

class CumulativeCommandsTool : public drizzled::plugin::TableFunction
{
public:

  CumulativeCommandsTool(LoggingStats *logging_stats);

  class Generator : public drizzled::plugin::TableFunction::Generator
  {
  public:
    Generator(drizzled::Field **arg, LoggingStats *logging_stats);

    bool populate();
  private:
    LoggingStats *inner_logging_stats;
    int32_t record_number;
    int32_t last_valid_index;
  };

  Generator *generator(drizzled::Field **arg)
  {
    return new Generator(arg, outer_logging_stats);
  }
private:
  LoggingStats *outer_logging_stats;
};

class CumulativeUserStatsTool : public drizzled::plugin::TableFunction
{
public:

  CumulativeUserStatsTool(LoggingStats *logging_stats);

  class Generator : public drizzled::plugin::TableFunction::Generator
  {
  public:
    Generator(drizzled::Field **arg, LoggingStats *logging_stats);

    bool populate();
  private:
    LoggingStats *inner_logging_stats;
    int32_t record_number;
    int32_t last_valid_index;
  };

  Generator *generator(drizzled::Field **arg)
  {
    return new Generator(arg, outer_logging_stats);
  }
private:
  LoggingStats *outer_logging_stats;
};

class ScoreboardStatsTool : public drizzled::plugin::TableFunction
{
public:

  ScoreboardStatsTool(LoggingStats *logging_stats);

  class Generator : public drizzled::plugin::TableFunction::Generator
  {
  public:
    Generator(drizzled::Field **arg, LoggingStats *logging_stats);

    bool populate();
  private:
    LoggingStats *inner_logging_stats;
    bool is_last_record;
  };

  Generator *generator(drizzled::Field **arg)
  {
    return new Generator(arg, outer_logging_stats);
  }
private:
  LoggingStats *outer_logging_stats;
};


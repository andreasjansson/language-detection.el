/*
 * This file is part of the Code::Blocks IDE and licensed under the GNU General Public License, version 3
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

#ifndef COMPILER_GNUMSP430_H
#define COMPILER_GNUMSP430_H
#include <compiler.h>
class CompilerGNUMSP430 : public Compiler
{
    public:
        CompilerGNUMSP430();
        virtual ~CompilerGNUMSP430();
        virtual void Reset();
        virtual void LoadDefaultRegExArray();
        virtual AutoDetectResult AutoDetectInstallationDir();
    protected:
        virtual Compiler* CreateCopy();
};
#endif // COMPILER_GNUMSP430_H

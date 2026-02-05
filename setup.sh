#!/bin/bash

# ==========================================
# SZÁZHALOMBATTA DASHBOARD - GYORS TELEPÍTŐ
# ==========================================

echo "🚀 Százhalombatta Smart City Dashboard - Telepítő"
echo "=================================================="
echo ""

# Színkódok
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ========== 1. ELLENŐRZÉSEK ==========
echo "🔍 1. Előfeltételek ellenőrzése..."

# Node.js ellenőrzés
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js nincs telepítve!${NC}"
    echo "   Telepítsd: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✅ Node.js telepítve: $(node --version)${NC}"

# npm ellenőrzés
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm nincs telepítve!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm telepítve: $(npm --version)${NC}"

# Git ellenőrzés
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git nincs telepítve!${NC}"
    echo "   Telepítsd: https://git-scm.com/"
    exit 1
fi
echo -e "${GREEN}✅ Git telepítve: $(git --version)${NC}"

echo ""

# ========== 2. .ENV FÁJL LÉTREHOZÁSA ==========
echo "📝 2. Környezeti változók beállítása..."

if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  A .env fájl már létezik. Felülírjam? (i/n)${NC}"
    read -r response
    if [[ "$response" != "i" ]]; then
        echo "   .env fájl megtartva."
    else
        cp .env.example .env
        echo -e "${GREEN}✅ .env fájl létrehozva .env.example alapján${NC}"
    fi
else
    cp .env.example .env
    echo -e "${GREEN}✅ .env fájl létrehozva${NC}"
fi

echo ""
echo -e "${YELLOW}⚠️  FONTOS: Töltsd ki a .env fájlt az API kulcsaiddal!${NC}"
echo "   1. Nyisd meg: nano .env"
echo "   2. Cseréld le a placeholdereket valódi API kulcsokra"
echo "   3. Mentsd el (Ctrl+O, Enter, Ctrl+X)"
echo ""
echo "Folytatod? (i/n)"
read -r continue_response

if [[ "$continue_response" != "i" ]]; then
    echo "Telepítés megszakítva."
    exit 0
fi

# ========== 3. FÜGGŐSÉGEK TELEPÍTÉSE ==========
echo ""
echo "📦 3. Függőségek telepítése..."

npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Függőségek telepítve${NC}"
else
    echo -e "${RED}❌ Függőségek telepítése sikertelen!${NC}"
    exit 1
fi

# ========== 4. GITIGNORE ELLENŐRZÉSE ==========
echo ""
echo "🔒 4. .gitignore ellenőrzése..."

if grep -q ".env" .gitignore; then
    echo -e "${GREEN}✅ .env védve a .gitignore-ban${NC}"
else
    echo -e "${YELLOW}⚠️  .env nincs a .gitignore-ban! Hozzáadás...${NC}"
    echo ".env" >> .gitignore
    echo -e "${GREEN}✅ .env hozzáadva${NC}"
fi

# ========== 5. KÉSZ ==========
echo ""
echo "=================================================="
echo -e "${GREEN}✅ TELEPÍTÉS SIKERES!${NC}"
echo "=================================================="
echo ""
echo "📌 Következő lépések:"
echo ""
echo "  1. Töltsd ki a .env fájlt az API kulcsaiddal:"
echo "     nano .env"
echo ""
echo "  2. Indítsd el a fejlesztői szervert:"
echo "     npm run dev"
echo ""
echo "  3. Nyisd meg a böngészőben:"
echo "     http://localhost:3000"
echo ""
echo "  4. Build production-re:"
echo "     npm run build"
echo ""
echo "=================================================="
echo ""
echo "🆘 Segítség:"
echo "   - Dokumentáció: docs/SECURITY_GUIDE.md"
echo "   - GitHub: https://github.com/bojtiferenc/Projekt-Dashboard"
echo ""

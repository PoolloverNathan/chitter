{
  inputs.nixpkgs.url = github:nixos/nixpkgs;
  outputs = { self, nixpkgs }: {
    packages = nixpkgs.lib.mapAttrs (system: pkgs: rec {
      default = pkgs.runCommand (pkgs.lib.importJSON ./package.json).name {
        buildInputs = [pkgs.bun];
        shellHook = ''
          ${pkgs.rsync}/bin/rsync --quiet -a ${modules}/ node_modules/
        '';
      } ''
        (
          set -x
          cp -r ${modules} node_modules
          cp -r ${./src} src
          cp ${./bun.lockb} bun.lockb
          sha256sum -c node_modules/sum
          test -f src/index.ts
          mkdir dist
          bun ${./build.ts}
          mv dist $out
        )
      '';
      modules = pkgs.runCommand "node_modules" {
        buildInputs = [pkgs.nodejs pkgs.bun];
        outputHash = sha256:hSQM+6MAsvj2IkS5pohSv7xn9BvS4pOqzBpPSuUnSRk=;
        outputHashMode = "recursive";
      } ''
        cp ${./package.json} package.json
        cp ${./bun.lockb} bun.lockb
        cp ${./bunfig.toml} bunfig.toml
        chmod +w bunfig.toml
        echo >> bunfig.toml "[install.cache]"
        echo >> bunfig.toml "disable = true"
        NODE_TLS_REJECT_UNAUTHORIZED=0 bun install
        mv node_modules $out
        sha256sum bun.lockb > $out/sum
      '';
    }) nixpkgs.legacyPackages;
  };
}

using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class SpawnCoins : MonoBehaviour
{
    public GameObject CoinPrefabTemplate;
    public Transform CoinsContainer;
    public GameObject BallTarget;
    
    // seconds
    private float _spawnInterval = 10f;
    private float _decayInterval = 2f;
    private WaitForSeconds _waitForSpawn;
    private WaitForSeconds _waitForDecay;
    
    private void Start()
    {
        _waitForSpawn = new WaitForSeconds(_spawnInterval);
        _waitForDecay = new WaitForSeconds(_decayInterval);
        StartCoroutine(SpawnCoin());
        StartCoroutine(DecayBall());
        Spawn();
    }

    private IEnumerator DecayBall()
    {
        yield return _waitForDecay;
        if (BallTarget.transform.localScale.x > 0.5f)
        {
            BallTarget.transform.localScale *= 0.99f;
        }
        StartCoroutine(DecayBall());
    }

    private IEnumerator SpawnCoin()
    {
        yield return _waitForSpawn;
        Spawn();
        StartCoroutine(SpawnCoin());
    }

    private void Spawn()
    {
        var coin = Instantiate(CoinPrefabTemplate, CoinsContainer);
        var xPos = Random.Range(-4, 4);
        var yPos = Random.Range(2, 5);
        var zPos = Random.Range(-4, 4);
        coin.transform.position = new Vector3(xPos, yPos, zPos);
    }
}
